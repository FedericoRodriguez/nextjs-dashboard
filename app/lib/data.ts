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
    const invoices: { rows: InvoicesTable[] } = {
      rows: [
        { id: '1', amount: 5000, date: '2024-08-01', status: 'paid', customer_id: '1', name: 'John Doe', email: 'john@example.com', image_url: '/images/john.jpg' },
        { id: '2', amount: 7000, date: '2024-08-02', status: 'pending', customer_id: '2', name: 'Jane Smith', email: 'jane@example.com', image_url: '/images/jane.jpg' },
      ],
    };

    return invoices.rows;
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
        { id: '1', name: 'John Doe', email: 'john@example.com', image_url: '/images/john.jpg', total_invoices: 3, total_pending: 2000, total_paid: 8000 },
        { id: '2', name: 'Jane Smith', email: 'jane@example.com', image_url: '/images/jane.jpg', total_invoices: 5, total_pending: 5000, total_paid: 12000 },
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
