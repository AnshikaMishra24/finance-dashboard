# Puppet Manifest for Finance Dashboard
# This is a demo manifest showing infrastructure as code

# Define application parameters
class finance_dashboard {
  $app_name = 'finance-dashboard'
  $app_directory = "/var/www/${app_name}"
  $web_user = 'www-data'
  $web_group = 'www-data'
  $web_server = 'nginx'

  # Ensure nginx is installed
  package { 'nginx':
    ensure => installed,
  }

  # Ensure nginx service is running
  service { 'nginx':
    ensure     => running,
    enable     => true,
    hasrestart => true,
    require    => Package['nginx'],
  }

  # Create application directory structure
  file { $app_directory:
    ensure => directory,
    owner  => $web_user,
    group  => $web_group,
    mode   => '0755',
  }

  # Create subdirectories
  file { "${app_directory}/css":
    ensure  => directory,
    owner   => $web_user,
    group   => $web_group,
    mode    => '0755',
    require => File[$app_directory],
  }

  file { "${app_directory}/js":
    ensure  => directory,
    owner   => $web_user,
    group   => $web_group,
    mode    => '0755',
    require => File[$app_directory],
  }

  file { "${app_directory}/images":
    ensure  => directory,
    owner   => $web_user,
    group   => $web_group,
    mode    => '0755',
    require => File[$app_directory],
  }

  file { "${app_directory}/devops":
    ensure  => directory,
    owner   => $web_user,
    group   => $web_group,
    mode    => '0755',
    require => File[$app_directory],
  }

  # Deploy nginx configuration
  file { "/etc/nginx/sites-available/${app_name}":
    ensure  => file,
    owner   => 'root',
    group   => 'root',
    mode    => '0644',
    content => template('finance_dashboard/nginx-site.conf.erb'),
    notify  => Service['nginx'],
  }

  # Enable site by creating symlink
  file { "/etc/nginx/sites-enabled/${app_name}":
    ensure  => link,
    target  => "/etc/nginx/sites-available/${app_name}",
    require => File["/etc/nginx/sites-available/${app_name}"],
    notify  => Service['nginx'],
  }

  # Remove default nginx site
  file { '/etc/nginx/sites-enabled/default':
    ensure => absent,
    notify => Service['nginx'],
  }

  # Deploy application files
  file { "${app_directory}/index.html":
    ensure  => file,
    owner   => $web_user,
    group   => $web_group,
    mode    => '0644',
    source  => 'puppet:///modules/finance_dashboard/index.html',
    require => File[$app_directory],
  }

  # Ensure proper SELinux context (if SELinux is enabled)
  if $facts['selinux'] {
    exec { 'set-selinux-context':
      command => "/usr/sbin/semanage fcontext -a -t httpd_sys_content_t '${app_directory}(/.*)?'",
      unless  => "/usr/sbin/semanage fcontext -l | grep ${app_directory}",
      notify  => Exec['restore-selinux-context'],
    }

    exec { 'restore-selinux-context':
      command     => "/sbin/restorecon -R ${app_directory}",
      refreshonly => true,
    }
  }

  # Configure firewall (using firewalld)
  firewalld_service { 'http':
    ensure => present,
    zone   => 'public',
  }

  firewalld_service { 'https':
    ensure => present,
    zone   => 'public',
  }

  # Log rotation for application logs
  file { '/etc/logrotate.d/finance-dashboard':
    ensure  => file,
    owner   => 'root',
    group   => 'root',
    mode    => '0644',
    content => "
      /var/log/nginx/${app_name}*.log {
        daily
        rotate 14
        compress
        delaycompress
        notifempty
        create 0640 ${web_user} adm
        sharedscripts
        postrotate
          [ -f /var/run/nginx.pid ] && kill -USR1 \$(cat /var/run/nginx.pid)
        endscript
      }
    ",
  }

  # Monitoring script
  file { '/usr/local/bin/check-dashboard.sh':
    ensure  => file,
    owner   => 'root',
    group   => 'root',
    mode    => '0755',
    content => "#!/bin/bash
# Health check script for Finance Dashboard

URL='http://localhost'
RESPONSE=\$(curl -s -o /dev/null -w '%{http_code}' \$URL)

if [ \$RESPONSE -eq 200 ]; then
  echo 'OK - Dashboard is responding'
  exit 0
else
  echo 'CRITICAL - Dashboard is not responding (HTTP \$RESPONSE)'
  exit 2
fi
",
  }

  # Cron job for health checks
  cron { 'dashboard-health-check':
    command => '/usr/local/bin/check-dashboard.sh >> /var/log/dashboard-health.log 2>&1',
    user    => 'root',
    minute  => '*/5',
  }
}

# Include the class
include finance_dashboard

# Notify completion
notify { 'deployment-complete':
  message => 'Finance Dashboard deployment completed successfully',
}
