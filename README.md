import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import { getDb } from './db.js';

const app = express();
const PORT = 3001;

const dashboardTemplates = {
  customer: {
    title: 'لوحة العميل',
    group: 'العميل',
    badge: '08 مناسبات',
    metrics: [
      { label: 'المناسبات النشطة', value: '08', trend: '+12%' },
      { label: 'الطلبات المستلمة', value: '42', trend: '+18%' },
      { label: 'إجمالي المدفوعات', value: '58,200', trend: '+7%' },
      { label: 'التقييم العام', value: '4.9', trend: 'ممتاز' }
    ],
    timeline: [
      { title: 'حفلة زواج في الرياض', status: 'قيد التنفيذ', meta: '09:00 صباحاً · 24 ديسمبر' },
      { title: 'عيد ميلاد 10 سنوات', status: 'مؤكدة', meta: '16:00 مساءً · 05 يناير' },
      { title: 'حفل تخرج', status: 'بانتظار الدفع', meta: '20:00 مساءً · 14 يناير' }
    ],
    services: [
      { name: 'قاعة افراح', value: 'SAR 8,500', action: 'عرض التفاصيل' },
      { name: 'تصوير', value: 'SAR 2,600', action: 'حجز الآن' },
      { name: 'ديكور', value: 'SAR 3,300', action: 'استعراض' },
      { name: 'حلويات', value: 'SAR 1,900', action: 'تحديد المذاق' }
    ],
    notes: [
      'تحديث حالة الحجز 3 ضمن المواعيد المقررة.',
      'تم إكمال دفعة 30% للقاعة في الرياض.',
      'إشعار تأكيد تم إرساله إلى مزود الخدمة.'
    ]
  },
  merchant: {
    title: 'لوحة التاجر',
    group: 'المتاجر',
    badge: '19 متجر',
    metrics: [
      { label: 'الحجوزات اليوم', value: '27', trend: '+9%' },
      { label: 'إيرادات الشهر', value: '128,400', trend: '+24%' },
      { label: 'معدل الإكمال', value: '96%', trend: 'جيد' },
      { label: 'الطلبات الجديدة', value: '11', trend: '+3' }
    ],
    timeline: [
      { title: 'طلب قاعة القاهرة', status: 'تم التأكيد', meta: 'العميل: محمد عادل' },
      { title: 'حجز تصوير عبر المنصة', status: 'قيد التحضير', meta: 'تم الدفع نصف المبلغ' },
      { title: 'استفسار عن باقات الحفلات', status: 'متابعة', meta: 'آخر تواصل منذ 30 دقيقة' }
    ],
    services: [
      { name: 'سيركومز قاعة', value: 'SAR 6,200', action: 'إدارة' },
      { name: 'مكياج عروس', value: 'SAR 1,500', action: 'عرض' },
      { name: 'خدمات العشاء', value: 'SAR 4,900', action: 'تحديث' },
      { name: 'ديكور + ورود', value: 'SAR 3,700', action: 'حزمة' }
    ],
    notes: [
      'تحديث الأسعار يخص باقة الصيف الحالية.',
      'تم حذف خدمة غير متاحة في المدينة.',
      'خانة المراجعات تستقبل تقييمات جديدة خلال هذا الأسبوع.'
    ]
  },
  supplier: {
    title: 'لوحة المورد',
    group: 'المتاجر',
    badge: '06 موردين',
    metrics: [
      { label: 'مستوى التوريد', value: '92%', trend: '+5%' },
      { label: 'أوامر الشراء', value: '34', trend: '+12%' },
      { label: 'التأخير', value: '02', trend: 'منخفض' },
      { label: 'الاستحقاقات', value: '17,300', trend: '+8%' }
    ],
    timeline: [
      { title: 'دفعة من متجر الورود', status: 'تم تجهيزها', meta: 'التسليم خلال 48 ساعة' },
      { title: 'طلب من قاعة فرح', status: 'قيد الانتظار', meta: 'تنسيق التوصيل' },
      { title: 'مستلزمات ديكور', status: 'مكتملة', meta: 'تمت الإضافة إلى المخزون' }
    ],
    services: [
      { name: 'ورود فاخر', value: 'SAR 1,000', action: 'تحديث المخزون' },
      { name: 'حلويات مخصصة', value: 'SAR 2,200', action: 'عرض' },
      { name: 'تزيين فطور', value: 'SAR 980', action: 'تسعير' },
      { name: 'مستلزمات الحفل', value: 'SAR 3,500', action: 'طلب' }
    ],
    notes: [
      'تم تحسين نموذج الطلب لعرض اعتمادات التسليم.',
      'إمكانية التوفير على أعباء الشحن المضافة الجديدة.',
      'تم تحديث مستويات المخزون في واجهة المورد.'
    ]
  },
  salon: {
    title: 'كاشير الصالون',
    group: 'المتاجر',
    badge: '12 جلسة',
    metrics: [
      { label: 'المبيعات اليوم', value: 'SAR 9,800', trend: '+14%' },
      { label: 'العملاء الحاليين', value: '08', trend: 'نشط' },
      { label: 'ملء الطاقم', value: '83%', trend: '+6%' },
      { label: 'مؤشرات الربح', value: '21%', trend: 'مستقر' }
    ],
    timeline: [
      { title: 'جلسة ميك اب عروس', status: 'جارٍ', meta: 'الموظفة: سارة' },
      { title: 'تجهيز جلسة حلاقة', status: 'مؤكدة', meta: 'بداية 17:30' },
      { title: 'تحميل باقة عروس', status: 'جاهز', meta: 'إضافة منتجات جديدة' }
    ],
    services: [
      { name: 'ميك أب عروس', value: 'SAR 1,400', action: 'تأمين' },
      { name: 'تنسيق شعر', value: 'SAR 900', action: 'حجز' },
      { name: 'صفائف شعر', value: 'SAR 1,100', action: 'إدارة' },
      { name: 'منتجات عناية', value: 'SAR 620', action: 'عرض' }
    ],
    notes: [
      'تمت إضافة باقة فخمة للميك أب الصيفي.',
      'جميع العملاء يحتاجون لجدولة تجديد المنتج.',
      'التذاكر المؤكدة تم إرسالها عبر الرسائل.'
    ]
  },
  tailor: {
    title: 'خياطة رجالية',
    group: 'المتاجر',
    badge: '07 طلبات',
    metrics: [
      { label: 'طلبات قيد التنفيذ', value: '14', trend: '+2' },
      { label: 'المبيعات الشهرية', value: 'SAR 17,600', trend: '+11%' },
      { label: 'معدل التسليم', value: '94%', trend: 'ممتاز' },
      { label: 'التقييم', value: '4.8', trend: 'مميز' }
    ],
    timeline: [
      { title: 'طلب بدلة عرس', status: 'قيد الخياطة', meta: 'الاستلام يوم الاثنين' },
      { title: 'بدلة احتفالية', status: 'مكتمل', meta: 'تم التسليم أمس' },
      { title: 'خياطة فستان جديد', status: 'في المتابعة', meta: 'تم تحديد المقاسات' }
    ],
    services: [
      { name: 'بدلات سهرة', value: 'SAR 2,200', action: 'خياطة' },
      { name: 'ملابس احتفالية', value: 'SAR 1,600', action: 'عرض' },
      { name: 'تعديل أزياء', value: 'SAR 500', action: 'استلام' },
      { name: 'تصميم خاص', value: 'SAR 3,100', action: 'طلب' }
    ],
    notes: [
      'مقاسات العيد تم تحديثها في النظام.',
      'لدينا طلبات عمل متأخرة تحتاج متابعة عاجلة.',
      'أعمدة الأسعار تمت مراجعتها أمس.'
    ]
  },
  admin: {
    title: 'لوحة المسؤول',
    group: 'الإدارة',
    badge: '1,284 مستخدم',
    metrics: [
      { label: 'المتاجر النشطة', value: '364', trend: '+18%' },
      { label: 'الإيراد الكلي', value: 'SAR 2.4M', trend: '+31%' },
      { label: 'المطالبات', value: '31', trend: 'متوسط' },
      { label: 'العمولات', value: 'SAR 310K', trend: '+22%' }
    ],
    timeline: [
      { title: 'تحديث النظام التجاري', status: 'جاهز', meta: 'تحديث marketing وحول الطلب' },
      { title: 'تقييمات متاجر جديدة', status: 'مراجعة', meta: 'مذكرات للتحقق' },
      { title: 'إعلانات ترويجية', status: 'قيد التنفيذ', meta: 'حملة المدينة الكبرى' }
    ],
    services: [
      { name: 'إدارة المتاجر', value: '1,240', action: 'مراجعة' },
      { name: 'الإحصاءات', value: '96 تقارير', action: 'عرض' },
      { name: 'العمولات', value: 'SAR 310K', action: 'فحص' },
      { name: 'الدعم', value: '28 تذكرة', action: 'حل' }
    ],
    notes: [
      'ارتفاع مستخدمين الجدد خلال آخر 30 يومًا.',
      'معيار رضا العملاء فوق 4.8.',
      'تم تجهيز خطة تمويل مناسبة للمرحلة القادمة.'
    ]
  }
};

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, message: 'Laylaty API is running' });
});

app.get('/api/dashboard', (req, res) => {
  const tab = req.query.tab || 'customer';
  const template = dashboardTemplates[tab];

  if (!template) {
    return res.status(400).json({ error: 'لوحة غير موجودة' });
  }

  const db = getDb();
  const orders = db.prepare('SELECT * FROM orders ORDER BY created_at DESC LIMIT 5').all();

  return res.json({
    ...template,
    recentOrders: orders.map((order) => ({
      id: order.id,
      title: order.title,
      customer: order.customer,
      service: order.service,
      amount: Number(order.amount),
      status: order.status,
      createdAt: order.created_at
    }))
  });
});

app.get('/api/orders', (_req, res) => {
  const db = getDb();
  const rows = db.prepare('SELECT * FROM orders ORDER BY created_at DESC').all();
  res.json(rows);
});

app.post('/api/orders', (req, res) => {
  const { title, customer, service, amount, status } = req.body || {};

  if (!title || !customer || !service || Number(amount) <= 0) {
    return res.status(400).json({ error: 'البيانات غير مكتملة' });
  }

  const order = {
    id: uuidv4(),
    title: String(title).trim(),
    customer: String(customer).trim(),
    service: String(service).trim(),
    amount: Number(amount),
    status: status ? String(status).trim() : 'قيد التنفيذ'
  };

  const db = getDb();
  const stmt = db.prepare(`
    INSERT INTO orders (id, title, customer, service, amount, status, created_at)
    VALUES (@id, @title, @customer, @service, @amount, @status, datetime('now'))
  `);

  stmt.run(order);
  return res.status(201).json({ ok: true, order });
});

app.listen(PORT, () => {
  console.log(`Laylaty API listening on http://localhost:${PORT}`);
});
