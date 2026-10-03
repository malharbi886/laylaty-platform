import Database from 'better-sqlite3';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const storageDir = path.join(__dirname, 'data');
const dbPath = path.join(storageDir, 'laylaty.db');

const db = new Database(dbPath);
db.pragma('journal_mode = WAL');

const schema = `
  CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    customer TEXT NOT NULL,
    service TEXT NOT NULL,
    amount REAL NOT NULL,
    status TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
`;

db.exec(schema);

const seedOrders = [
  {
    id: 'ord-001',
    title: 'حفل زفاف في الرياض',
    customer: 'سارة محمد',
    service: 'قاعة أفراح',
    amount: 8500,
    status: 'مؤكدة'
  },
  {
    id: 'ord-002',
    title: 'عيد ميلاد 10 سنوات',
    customer: 'أحمد فهد',
    service: 'تصوير',
    amount: 2600,
    status: 'قيد التنفيذ'
  },
  {
    id: 'ord-003',
    title: 'حفل تخرج',
    customer: 'ليلى ناصر',
    service: 'ديكور',
    amount: 3300,
    status: 'بانتظار الدفع'
  }
];

const count = db.prepare('SELECT COUNT(*) as total FROM orders').get().total;
if (count === 0) {
  const insertStmt = db.prepare(`
    INSERT INTO orders (id, title, customer, service, amount, status, created_at)
    VALUES (@id, @title, @customer, @service, @amount, @status, datetime('now'))
  `);

  for (const order of seedOrders) {
    insertStmt.run(order);
  }
}

export function getDb() {
  return db;
}
