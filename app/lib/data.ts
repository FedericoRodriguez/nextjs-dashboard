import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoice,
  LatestInvoiceRaw,
  FormattedCustomersTable,
  Revenue,
  CardData
} from './definitions';
import { formatCurrency } from './utils';



export async function fetchRevenue(): Promise<Revenue[]> {
  try {

    console.log('Fetching revenue data...');
    await new Promise((resolve) => setTimeout(resolve, 3000));
    // Simulating the data that would be returned by SQL
    const data: { rows: Revenue[] } = {
      rows: [
        { month: '2024-01', revenue: 50000 },
        { month: '2024-02', revenue: 45000 },
        { month: '2024-03', revenue: 45000 },
        { month: '2024-04', revenue: 4000 },
        { month: '2024-05', revenue: 5000 },
        { month: '2024-06', revenue: 45000 },
        { month: '2024-07', revenue: 45000 },
        { month: '2024-08', revenue: 20000 },
      ],
    };
    console.log('Data fetch completed after 3 seconds.');
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestInvoices(): Promise<LatestInvoice[]> {
  try {
    // Simulating the data that would be returned by SQL
    await new Promise((resolve) => setTimeout(resolve, 5000));
    const data: { rows: LatestInvoiceRaw[] } = {
      rows: [
        { id: '1', amount: 5000, name: 'John Doe', image_url: '/customers/lee-robinson.png', email: 'john@example.com' },
        { id: '2', amount: 7000, name: 'Jane Smith', image_url: '/customers/michael-novotny.png', email: 'jane@example.com' },
      ],
    };

    const latestInvoices: LatestInvoice[] = data.rows.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));

    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchCardData(): Promise<CardData> {

  try {

    // Simulating the data that would be returned by SQL
    const invoiceCount = { rows: [{ count: '10' }] };
    const customerCount = { rows: [{ count: '5' }] };
    const invoiceStatus = {
      rows: [
        { paid: 30000, pending: 5000 },
      ],
    };

    const numberOfInvoices = Number(invoiceCount.rows[0].count ?? '0');
    const numberOfCustomers = Number(customerCount.rows[0].count ?? '0');
    const totalPaidInvoices = formatCurrency(invoiceStatus.rows[0].paid ?? '0');
    const totalPendingInvoices = formatCurrency(invoiceStatus.rows[0].pending ?? '0');

    const cardData: CardData = {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    }
    return cardData;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;

export async function fetchFilteredInvoices(query: string, currentPage: number): Promise<InvoicesTable[]> {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    // Simulating the data that would be returned by SQL
    const invoices: InvoicesTable[] = [
      { id: '1', amount: 5000, date: '2024-08-01', status: 'paid', customer_id: '1', name: 'John Doe', email: 'john@example.com', image_url: '/customers/balazs-orban.png' },
      { id: '2', amount: 7000, date: '2024-08-02', status: 'pending', customer_id: '2', name: 'Jane Smith', email: 'jane@example.com', image_url: '/customers/Jane.png' },
      { id: '3', amount: 6000, date: '2024-08-03', status: 'paid', customer_id: '3', name: 'Alice Johnson', email: 'alice@example.com', image_url: '/customers/alice-johnson.png' },
      { id: '4', amount: 6200, date: '2024-08-04', status: 'paid', customer_id: '4', name: 'Emily Davis', email: 'emily.davis@example.com', image_url: '/customers/Emily.jpg' },
      { id: '5', amount: 3000, date: '2024-08-05', status: 'pending', customer_id: '5', name: 'Christopher Lee', email: 'chris.lee@example.com', image_url: '/customers/Christopher.jpg' },
      { id: '6', amount: 5200, date: '2024-08-06', status: 'paid', customer_id: '6', name: 'Jessica Wilson', email: 'jessica.wilson@example.com', image_url: '/customers/Jessica.jpg' },
      { id: '7', amount: 4000, date: '2024-08-07', status: 'pending', customer_id: '7', name: 'David Martinez', email: 'david.martinez@example.com', image_url: '/customers/David.jpg' },
      { id: '8', amount: 6100, date: '2024-08-08', status: 'paid', customer_id: '8', name: 'Sarah Taylor', email: 'sarah.taylor@example.com', image_url: '/customers/Sarah.jpg' },
      { id: '9', amount: 7500, date: '2024-08-09', status: 'paid', customer_id: '9', name: 'Daniel Brown', email: 'daniel.brown@example.com', image_url: '/customers/Daniel.jpg' },
      { id: '10', amount: 4200, date: '2024-08-10', status: 'pending', customer_id: '10', name: 'Laura Moore', email: 'laura.moore@example.com', image_url: '/customers/Laura.jpg' },
      { id: '11', amount: 8200, date: '2024-08-11', status: 'paid', customer_id: '11', name: 'Robert Thomas', email: 'robert.thomas@example.com', image_url: '/customers/Robert.jpg' },
      { id: '12', amount: 3500, date: '2024-08-12', status: 'paid', customer_id: '12', name: 'Olivia Harris', email: 'olivia.harris@example.com', image_url: '/customers/Olivia.jpg' },
      { id: '13', amount: 6300, date: '2024-08-13', status: 'pending', customer_id: '13', name: 'William Clark', email: 'william.clark@example.com', image_url: '/customers/William.jpg' },
      { id: '14', amount: 2800, date: '2024-08-14', status: 'paid', customer_id: '14', name: 'Sophia Lewis', email: 'sophia.lewis@example.com', image_url: '/customers/Sophia.jpg' },
      { id: '15', amount: 9500, date: '2024-08-15', status: 'paid', customer_id: '15', name: 'James Allen', email: 'james.allen@example.com', image_url: '/customers/James.jpg' },
      { id: '16', amount: 4100, date: '2024-08-16', status: 'pending', customer_id: '16', name: 'Emma Walker', email: 'emma.walker@example.com', image_url: '/customers/Emma.jpg' },
      { id: '17', amount: 7000, date: '2024-08-17', status: 'paid', customer_id: '17', name: 'Matthew Young', email: 'matthew.young@example.com', image_url: '/customers/Matthew.jpg' },
      { id: '18', amount: 4900, date: '2024-08-18', status: 'paid', customer_id: '18', name: 'Isabella King', email: 'isabella.king@example.com', image_url: '/customers/Isabella.jpg' },
      { id: '19', amount: 5200, date: '2024-08-19', status: 'pending', customer_id: '19', name: 'Joshua Wright', email: 'joshua.wright@example.com', image_url: '/customers/Joshua.jpg' },
      { id: '20', amount: 7800, date: '2024-08-20', status: 'paid', customer_id: '20', name: 'Mia Hill', email: 'mia.hill@example.com', image_url: '/customers/Mia.jpg' },
      { id: '21', amount: 6400, date: '2024-08-21', status: 'pending', customer_id: '21', name: 'Ethan Scott', email: 'ethan.scott@example.com', image_url: '/customers/Ethan.jpg' }
    ];

    // Filter invoices based on the query parameter (case-insensitive)
    const filteredInvoices = invoices.filter(invoice =>
      invoice.name.toLowerCase().includes(query.toLowerCase()) ||
      invoice.email.toLowerCase().includes(query.toLowerCase()) ||
      invoice.amount.toString().includes(query) ||
      invoice.date.includes(query) ||
      invoice.status.toLowerCase().includes(query.toLowerCase())
    );

    // Apply pagination using offset and ITEMS_PER_PAGE
    const paginatedInvoices = filteredInvoices.slice(offset, offset + ITEMS_PER_PAGE);

    return paginatedInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchInvoicesPages(query: string): Promise<number> {
  try {
    // Simulating the data that would be returned by SQL
    const count: { rows: [{ count: string }] } = {
      rows: [{ count: '12' }],
    };

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchInvoiceById(id: string): Promise<InvoiceForm> {
  try {
    // Simulating the data that would be returned by SQL
    const data: { rows: InvoiceForm[] } = {
      rows: [
        { id: '1', customer_id: '2', amount: 5000, status: 'paid' },
      ],
    };

    const invoice = data.rows.map((invoice) => ({
      ...invoice,
      amount: invoice.amount / 100, // Convert amount from cents to dollars
    }));

    return invoice[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchCustomers(): Promise<CustomerField[]> {
  try {
    // Simulating the data that would be returned by SQL
    const data: { rows: CustomerField[] } = {
      rows: [
        { id: '1', name: 'John Doe' },
        { id: '2', name: 'Jane Smith' },
      ],
    };

    return data.rows;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchFilteredCustomers(query: string): Promise<FormattedCustomersTable[]> {
  try {
    // Simulating the data that would be returned by SQL
    const data: { rows: CustomersTableType[] } = {
      rows: [
        { id: '1', name: 'John Doe', email: 'john@example.com', image_url: '/customers/felipe.jpg', total_invoices: 3, total_pending: 2000, total_paid: 8000 },
        { id: '2', name: 'Jane Smith', email: 'jane@example.com', image_url: '/customers/Jane.jpg', total_invoices: 5, total_pending: 5000, total_paid: 12000 },
        { id: '3', name: 'Michael Johnson', email: 'michael.johnson@example.com', image_url: '/customers/felipe.jpg', total_invoices: 8, total_pending: 7500, total_paid: 15000 },
        { id: '4', name: 'Emily Davis', email: 'emily.davis@example.com', image_url: '/customers/Jane.jpg', total_invoices: 3, total_pending: 2000, total_paid: 8000 },
        { id: '5', name: 'Christopher Lee', email: 'chris.lee@example.com', image_url: '/customers/felipe.jpg', total_invoices: 10, total_pending: 6000, total_paid: 20000 },
        { id: '6', name: 'Jessica Wilson', email: 'jessica.wilson@example.com', image_url: '/customers/Jane.jpg', total_invoices: 7, total_pending: 4000, total_paid: 13000 },
        { id: '7', name: 'David Martinez', email: 'david.martinez@example.com', image_url: '/customers/felipe.jpg', total_invoices: 4, total_pending: 3500, total_paid: 9500 },
        { id: '8', name: 'Sarah Taylor', email: 'sarah.taylor@example.com', image_url: '/customers/Jane.jpg', total_invoices: 6, total_pending: 3000, total_paid: 11000 },
        { id: '9', name: 'Daniel Brown', email: 'daniel.brown@example.com', image_url: '/customers/felipe.jpg', total_invoices: 9, total_pending: 8000, total_paid: 17000 },
        { id: '10', name: 'Laura Moore', email: 'laura.moore@example.com', image_url: '/customers/Jane.jpg', total_invoices: 5, total_pending: 4500, total_paid: 14000 },
        { id: '11', name: 'Robert Thomas', email: 'robert.thomas@example.com', image_url: '/customers/felipe.jpg', total_invoices: 12, total_pending: 9500, total_paid: 21000 },
        { id: '12', name: 'Olivia Harris', email: 'olivia.harris@example.com', image_url: '/customers/Jane.jpg', total_invoices: 4, total_pending: 2500, total_paid: 9000 },
        { id: '13', name: 'William Clark', email: 'william.clark@example.com', image_url: '/customers/felipe.jpg', total_invoices: 7, total_pending: 5000, total_paid: 16000 },
        { id: '14', name: 'Sophia Lewis', email: 'sophia.lewis@example.com', image_url: '/customers/Jane.jpg', total_invoices: 3, total_pending: 1500, total_paid: 7000 },
        { id: '15', name: 'James Allen', email: 'james.allen@example.com', image_url: '/customers/felipe.jpg', total_invoices: 11, total_pending: 8500, total_paid: 19000 },
        { id: '16', name: 'Emma Walker', email: 'emma.walker@example.com', image_url: '/customers/Jane.jpg', total_invoices: 6, total_pending: 4000, total_paid: 13000 },
        { id: '17', name: 'Matthew Young', email: 'matthew.young@example.com', image_url: '/customers/felipe.jpg', total_invoices: 9, total_pending: 7000, total_paid: 16000 },
        { id: '18', name: 'Isabella King', email: 'isabella.king@example.com', image_url: '/customers/Jane.jpg', total_invoices: 4, total_pending: 3500, total_paid: 10000 },
        { id: '19', name: 'Joshua Wright', email: 'joshua.wright@example.com', image_url: '/customers/felipe.jpg', total_invoices: 5, total_pending: 6000, total_paid: 14000 },
        { id: '20', name: 'Mia Hill', email: 'mia.hill@example.com', image_url: '/customers/Jane.jpg', total_invoices: 8, total_pending: 7500, total_paid: 18000 },
        { id: '21', name: 'Ethan Scott', email: 'ethan.scott@example.com', image_url: '/customers/felipe.jpg', total_invoices: 10, total_pending: 8000, total_paid: 20000 },
        { id: '22', name: 'Amelia Green', email: 'amelia.green@example.com', image_url: '/customers/Jane.jpg', total_invoices: 7, total_pending: 4500, total_paid: 13000 }
      ],
    };

    const customers: FormattedCustomersTable[] = data.rows.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}
