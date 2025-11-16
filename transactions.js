/**
 * Finance Dashboard - Transactions Management
 * Handles transaction display, filtering, and pagination
 */

// Sample transaction data
const transactionsData = [
    { id: 1, date: '2024-01-15', description: 'Salary Deposit', category: 'Salary', amount: 5000, type: 'Credit', status: 'Completed' },
    { id: 2, date: '2024-01-14', description: 'Grocery Shopping', category: 'Food', amount: 156.50, type: 'Debit', status: 'Completed' },
    { id: 3, date: '2024-01-13', description: 'Rent Payment', category: 'Housing', amount: 1200, type: 'Debit', status: 'Completed' },
    { id: 4, date: '2024-01-12', description: 'Freelance Project', category: 'Freelance', amount: 850, type: 'Credit', status: 'Completed' },
    { id: 5, date: '2024-01-11', description: 'Electric Bill', category: 'Housing', amount: 120, type: 'Debit', status: 'Completed' },
    { id: 6, date: '2024-01-10', description: 'Restaurant', category: 'Food', amount: 75.30, type: 'Debit', status: 'Completed' },
    { id: 7, date: '2024-01-09', description: 'Online Shopping', category: 'Shopping', amount: 245, type: 'Debit', status: 'Completed' },
    { id: 8, date: '2024-01-08', description: 'Gas Station', category: 'Transport', amount: 55, type: 'Debit', status: 'Completed' },
    { id: 9, date: '2024-01-07', description: 'Movie Tickets', category: 'Entertainment', amount: 35, type: 'Debit', status: 'Completed' },
    { id: 10, date: '2024-01-06', description: 'Freelance Payment', category: 'Freelance', amount: 600, type: 'Credit', status: 'Completed' },
    { id: 11, date: '2024-01-05', description: 'Coffee Shop', category: 'Food', amount: 15.50, type: 'Debit', status: 'Completed' },
    { id: 12, date: '2024-01-04', description: 'Uber Ride', category: 'Transport', amount: 28, type: 'Debit', status: 'Completed' },
    { id: 13, date: '2024-01-03', description: 'Investment Return', category: 'Investment', amount: 250, type: 'Credit', status: 'Completed' },
    { id: 14, date: '2024-01-02', description: 'Gym Membership', category: 'Entertainment', amount: 50, type: 'Debit', status: 'Completed' },
    { id: 15, date: '2024-01-01', description: 'Bonus Payment', category: 'Salary', amount: 1000, type: 'Credit', status: 'Completed' },
    { id: 16, date: '2023-12-30', description: 'Supermarket', category: 'Food', amount: 185.75, type: 'Debit', status: 'Completed' },
    { id: 17, date: '2023-12-29', description: 'Internet Bill', category: 'Housing', amount: 79.99, type: 'Debit', status: 'Completed' },
    { id: 18, date: '2023-12-28', description: 'Clothing Store', category: 'Shopping', amount: 320, type: 'Debit', status: 'Completed' },
    { id: 19, date: '2023-12-27', description: 'Pharmacy', category: 'Shopping', amount: 45.60, type: 'Debit', status: 'Completed' },
    { id: 20, date: '2023-12-26', description: 'Consulting Fee', category: 'Freelance', amount: 1500, type: 'Credit', status: 'Completed' }
];

// Pagination variables
let currentPage = 1;
const itemsPerPage = 10;
let filteredTransactions = [...transactionsData];

/**
 * Initialize transactions table
 */
document.addEventListener('DOMContentLoaded', function() {
    const tbody = document.getElementById('transactionsBody');
    if (!tbody) return;
    
    // Display initial transactions
    displayTransactions();
});

/**
 * Display transactions in table
 */
function displayTransactions() {
    const tbody = document.getElementById('transactionsBody');
    if (!tbody) return;
    
    // Calculate pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedTransactions = filteredTransactions.slice(startIndex, endIndex);
    
    // Clear existing rows
    tbody.innerHTML = '';
    
    // Populate table
    paginatedTransactions.forEach(transaction => {
        const row = document.createElement('tr');
        
        // Format amount with sign
        const amountFormatted = transaction.type === 'Credit' 
            ? `+${formatCurrency(transaction.amount)}`
            : `-${formatCurrency(transaction.amount)}`;
        
        const amountClass = transaction.type === 'Credit' ? 'credit' : 'debit';
        
        row.innerHTML = `
            <td>${formatDate(transaction.date)}</td>
            <td>${transaction.description}</td>
            <td>${transaction.category}</td>
            <td class="transaction-amount ${amountClass}">${amountFormatted}</td>
            <td><span class="status-badge status-${transaction.status.toLowerCase()}">${transaction.type}</span></td>
            <td><span class="status-badge status-${transaction.status.toLowerCase()}">${transaction.status}</span></td>
        `;
        
        tbody.appendChild(row);
    });
    
    // Update pagination info
    updatePaginationInfo();
}

/**
 * Filter transactions based on search and filters
 */
function filterTransactions() {
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const categoryFilter = document.getElementById('categoryFilter')?.value || '';
    const typeFilter = document.getElementById('typeFilter')?.value || '';
    const dateFilter = document.getElementById('dateFilter')?.value || '';
    
    // Apply filters
    filteredTransactions = transactionsData.filter(transaction => {
        // Search filter
        const matchesSearch = transaction.description.toLowerCase().includes(searchTerm) ||
                            transaction.category.toLowerCase().includes(searchTerm);
        
        // Category filter
        const matchesCategory = !categoryFilter || transaction.category === categoryFilter;
        
        // Type filter
        const matchesType = !typeFilter || transaction.type === typeFilter;
        
        // Date filter (simplified)
        let matchesDate = true;
        if (dateFilter) {
            const transactionDate = new Date(transaction.date);
            const today = new Date();
            
            if (dateFilter === 'today') {
                matchesDate = transactionDate.toDateString() === today.toDateString();
            } else if (dateFilter === 'week') {
                const weekAgo = new Date(today.setDate(today.getDate() - 7));
                matchesDate = transactionDate >= weekAgo;
            } else if (dateFilter === 'month') {
                matchesDate = transactionDate.getMonth() === new Date().getMonth();
            } else if (dateFilter === 'year') {
                matchesDate = transactionDate.getFullYear() === new Date().getFullYear();
            }
        }
        
        return matchesSearch && matchesCategory && matchesType && matchesDate;
    });
    
    // Reset to first page
    currentPage = 1;
    
    // Update display
    displayTransactions();
}

/**
 * Reset all filters
 */
function resetFilters() {
    document.getElementById('searchInput').value = '';
    document.getElementById('categoryFilter').value = '';
    document.getElementById('typeFilter').value = '';
    document.getElementById('dateFilter').value = '';
    
    filteredTransactions = [...transactionsData];
    currentPage = 1;
    displayTransactions();
}

/**
 * Update pagination information
 */
function updatePaginationInfo() {
    const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
    const pageInfo = document.getElementById('pageInfo');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (pageInfo) {
        pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    }
    
    if (prevBtn) {
        prevBtn.disabled = currentPage === 1;
    }
    
    if (nextBtn) {
        nextBtn.disabled = currentPage === totalPages;
    }
}

/**
 * Navigate to previous page
 */
function previousPage() {
    if (currentPage > 1) {
        currentPage--;
        displayTransactions();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

/**
 * Navigate to next page
 */
function nextPage() {
    const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        displayTransactions();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}
