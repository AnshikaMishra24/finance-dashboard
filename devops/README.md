# 🔧 DevOps Integration Guide

This directory contains DevOps automation and monitoring configurations for the Finance Dashboard project.

## 📋 Overview

The DevOps files demonstrate industry-standard practices for:
- **Automated Deployment** (Ansible)
- **Configuration Management** (Puppet)
- **Monitoring & Alerting** (Nagios)

> **Note**: These are demo configurations for educational purposes. Adapt them for production use.

## 📁 Files Included

### 1. `ansible-playbook.yml`
Ansible playbook for automated deployment

### 2. `puppet-manifest.pp`
Puppet manifest for infrastructure as code

### 3. `nagios-config.txt`
Nagios monitoring configuration

## 🚀 Ansible Deployment

### Prerequisites
\`\`\`bash
# Install Ansible
sudo apt-get update
sudo apt-get install ansible -y

# Verify installation
ansible --version
\`\`\`

### Configuration

1. **Create Inventory File** (`inventory.ini`):
\`\`\`ini
[webservers]
finance-server ansible_host=192.168.1.100 ansible_user=ubuntu
\`\`\`

2. **Test Connection**:
\`\`\`bash
ansible webservers -i inventory.ini -m ping
\`\`\`

3. **Run Playbook**:
\`\`\`bash
ansible-playbook -i inventory.ini ansible-playbook.yml
\`\`\`

### What It Does
- ✅ Updates system packages
- ✅ Installs Nginx web server
- ✅ Creates application directories
- ✅ Copies frontend files
- ✅ Configures virtual hosts
- ✅ Sets permissions
- ✅ Validates configuration
- ✅ Restarts services

## 🎭 Puppet Configuration

### Prerequisites
\`\`\`bash
# Install Puppet
wget https://apt.puppet.com/puppet-release-focal.deb
sudo dpkg -i puppet-release-focal.deb
sudo apt-get update
sudo apt-get install puppet-agent -y
\`\`\`

### Apply Manifest

1. **Syntax Check**:
\`\`\`bash
puppet parser validate puppet-manifest.pp
\`\`\`

2. **Dry Run**:
\`\`\`bash
puppet apply --noop puppet-manifest.pp
\`\`\`

3. **Apply Configuration**:
\`\`\`bash
sudo puppet apply puppet-manifest.pp
\`\`\`

### Features
- 📦 Package management (Nginx)
- 📁 Directory structure creation
- 🔐 Permission enforcement
- 🔄 Service management
- 🔥 Firewall configuration
- 📝 Log rotation setup
- 🏥 Health check scripts

## 📊 Nagios Monitoring

### Prerequisites
\`\`\`bash
# Install Nagios
sudo apt-get install nagios4 nagios-plugins -y
\`\`\`

### Configuration Steps

1. **Copy Configuration**:
\`\`\`bash
sudo cp nagios-config.txt /etc/nagios4/objects/finance-dashboard.cfg
\`\`\`

2. **Update Main Config**:
Add to `/etc/nagios4/nagios.cfg`:
\`\`\`cfg
cfg_file=/etc/nagios4/objects/finance-dashboard.cfg
\`\`\`

3. **Verify Configuration**:
\`\`\`bash
sudo nagios4 -v /etc/nagios4/nagios.cfg
\`\`\`

4. **Restart Nagios**:
\`\`\`bash
sudo systemctl restart nagios4
\`\`\`

5. **Access Web Interface**:
\`\`\`
http://your-server-ip/nagios4
Username: nagiosadmin
Password: [your-password]
\`\`\`

### Monitored Services

| Service | Check Interval | Threshold |
|---------|---------------|-----------|
| HTTP | 5 min | Response time < 3s |
| HTTPS | 5 min | Response time < 3s |
| CPU | 5 min | 80% warning, 90% critical |
| Memory | 5 min | 80% warning, 90% critical |
| Disk | 5 min | 80% warning, 90% critical |
| Nginx Process | 5 min | 1-10 processes |
| SSL Certificate | 12 hours | 30 days warning, 15 days critical |

## 🔄 Complete DevOps Workflow

### Step 1: Development
\`\`\`bash
# Make changes to code
git add .
git commit -m "Update dashboard"
git push origin main
\`\`\`

### Step 2: Deployment (Ansible)
\`\`\`bash
# Deploy to server
ansible-playbook -i inventory.ini ansible-playbook.yml
\`\`\`

### Step 3: Configuration (Puppet)
\`\`\`bash
# Ensure configuration
sudo puppet apply puppet-manifest.pp
\`\`\`

### Step 4: Monitoring (Nagios)
\`\`\`bash
# Verify monitoring
sudo systemctl status nagios4
# Access dashboard at http://server-ip/nagios4
\`\`\`

## 🏗️ Infrastructure Architecture

\`\`\`
┌─────────────────────────────────────────────┐
│            Load Balancer (Optional)          │
└──────────────────┬──────────────────────────┘
                   │
    ┌──────────────┴──────────────┐
    │                             │
┌───▼────┐                   ┌───▼────┐
│ Web    │                   │ Web    │
│ Server │                   │ Server │
│ (Nginx)│                   │ (Nginx)│
└───┬────┘                   └───┬────┘
    │                            │
    └──────────────┬─────────────┘
                   │
           ┌───────▼────────┐
           │   Monitoring   │
           │    (Nagios)    │
           └────────────────┘
\`\`\`

## 🔐 Security Best Practices

### For Ansible
- Use Ansible Vault for sensitive data
- SSH key authentication instead of passwords
- Limit sudo access
- Regular playbook audits

\`\`\`bash
# Encrypt sensitive variables
ansible-vault encrypt vars.yml

# Run with vault
ansible-playbook -i inventory.ini ansible-playbook.yml --ask-vault-pass
\`\`\`

### For Puppet
- Use Hiera for secrets
- Role-based access control
- Certificate-based authentication
- Regular manifest reviews

### For Nagios
- Strong admin password
- HTTPS for web interface
- Restrict access by IP
- Regular security updates

## 📈 Monitoring Dashboard

### Key Metrics to Watch

1. **Availability**: Uptime percentage
2. **Performance**: Response times
3. **Resources**: CPU, Memory, Disk usage
4. **Errors**: HTTP errors, application errors
5. **Security**: SSL status, failed logins

### Alert Configuration

Edit `/etc/nagios4/objects/contacts.cfg`:
\`\`\`cfg
define contact {
    contact_name            admin
    alias                   System Admin
    email                   your-email@example.com
    service_notification_commands   notify-service-by-email
    host_notification_commands      notify-host-by-email
}
\`\`\`

## 🧪 Testing

### Test Ansible Playbook
\`\`\`bash
# Syntax check
ansible-playbook --syntax-check ansible-playbook.yml

# Dry run
ansible-playbook -i inventory.ini ansible-playbook.yml --check

# Run with verbose output
ansible-playbook -i inventory.ini ansible-playbook.yml -vvv
\`\`\`

### Test Puppet Manifest
\`\`\`bash
# Validate syntax
puppet parser validate puppet-manifest.pp

# Dry run
puppet apply --noop puppet-manifest.pp

# Apply with debug
puppet apply puppet-manifest.pp --debug
\`\`\`

### Test Nagios Config
\`\`\`bash
# Verify configuration
sudo nagios4 -v /etc/nagios4/nagios.cfg

# Test specific service
sudo /usr/lib/nagios/plugins/check_http -H localhost
\`\`\`

## 📚 Additional Resources

### Ansible
- [Ansible Documentation](https://docs.ansible.com/)
- [Ansible Galaxy](https://galaxy.ansible.com/)
- [Best Practices](https://docs.ansible.com/ansible/latest/user_guide/playbooks_best_practices.html)

### Puppet
- [Puppet Documentation](https://puppet.com/docs/)
- [Puppet Forge](https://forge.puppet.com/)
- [Style Guide](https://puppet.com/docs/puppet/latest/style_guide.html)

### Nagios
- [Nagios Core Documentation](https://assets.nagios.com/downloads/nagioscore/docs/)
- [Plugin Development](https://nagios-plugins.org/doc/guidelines.html)
- [Community Exchange](https://exchange.nagios.org/)

## 🐛 Troubleshooting

### Ansible Issues

**Problem**: Connection refused
\`\`\`bash
# Check SSH access
ssh user@server-ip

# Verify inventory
ansible-inventory -i inventory.ini --list
\`\`\`

**Problem**: Permission denied
\`\`\`bash
# Add sudo privileges
# Edit playbook to use: become: yes
\`\`\`

### Puppet Issues

**Problem**: Module not found
\`\`\`bash
# Install required modules
puppet module install puppetlabs-nginx
\`\`\`

**Problem**: Service won't start
\`\`\`bash
# Check service status
sudo systemctl status nginx

# View logs
sudo journalctl -u nginx
\`\`\`

### Nagios Issues

**Problem**: Service checks failing
\`\`\`bash
# Test plugin manually
sudo /usr/lib/nagios/plugins/check_http -H localhost

# Check NRPE
sudo /usr/lib/nagios/plugins/check_nrpe -H localhost
\`\`\`

**Problem**: Web interface not accessible
\`\`\`bash
# Restart Apache
sudo systemctl restart apache2

# Check firewall
sudo ufw status
\`\`\`

## 🎓 Learning Path

1. **Week 1**: Understand Ansible basics
   - YAML syntax
   - Playbook structure
   - Modules and tasks

2. **Week 2**: Learn Puppet fundamentals
   - Manifests
   - Resources
   - Classes and modules

3. **Week 3**: Setup Nagios monitoring
   - Install and configure
   - Add services
   - Configure alerts

4. **Week 4**: Integration and automation
   - CI/CD pipeline
   - Automated deployments
   - Monitoring integration

## 🤝 Contributing

Improvements welcome! Areas to enhance:
- [ ] Docker containerization
- [ ] Kubernetes orchestration
- [ ] CI/CD pipeline (Jenkins/GitLab CI)
- [ ] Infrastructure as Code (Terraform)
- [ ] Log aggregation (ELK Stack)
- [ ] Metrics (Prometheus/Grafana)

---

**For Production Use**: Review and customize all configurations, add proper security measures, and test thoroughly in a staging environment.
