import { departments, doctors, doctorsExtra, moreDoctors } from './site'

export const deptSlug = name => name.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

const allDoctors = [...doctors, ...doctorsExtra, ...moreDoctors]
const doc = name => allDoctors.find(d => d.name === name)

// Page text lives in ./content.js and is imported only by the page components (keeps it out of the main bundle).

// Which consultants lead each department (shown on its page)
const leads = {
  nephrology: ['Dr. Paladugu Ramakrishna'],
  urology: ['Dr. G. Srinivasa Rao', 'Dr. K. Prashanth Kumar'],
  'gynecology-and-obstetrics': ['Dr. Chandana Veeramachaneni'],
  'fertility-and-ivf': ['Dr. Chandana Veeramachaneni'],
  orthopaedics: ['Dr. Pavan Krishna Uppaluri'],
  anesthesiology: ['Dr. Kusuma'],
  pulmonology: ['Dr. T. Jaya Prakash'],
}

export const deptPages = departments.map(d => {
  const slug = deptSlug(d.name)
  return { ...d, slug, img: `/img/departments/${slug}.jpg`, doctors: (leads[slug] ?? []).map(doc).filter(Boolean) }
})
export const deptBySlug = slug => deptPages.find(d => d.slug === slug)

// Hospital-wide services (from the previous site's Services page)
export const services = [
  { title: 'Emergency & trauma care', img: '/img/services/emergency.jpg', text: 'Round-the-clock emergency care. Our team rapidly evaluates each case and starts specialised treatment without delay.' },
  { title: '24-hour ambulance', img: '/img/services/ambulance.jpg', text: 'Ambulances equipped with oxygen, ventilator, monitors, syringe pumps and emergency drugs, staffed by expert paramedics, 365 days a year.' },
  { title: 'Intensive care unit', img: '/img/services/icu.jpg', text: 'Care for critically ill patients needing ventilator support, blood-pressure support, dialysis for acute kidney failure or treatment for multi-organ dysfunction.' },
  { title: 'Critical care units', img: '/img/services/criticalcare.jpg', text: 'A tertiary referral ICU with experienced intensivists, nurses and infrastructure for patients whose lives are at risk.' },
  { title: 'Lab tests & diagnostics', img: '/img/services/lab.jpg', text: 'Pathology and radiology including CT, MRI, ultrasound, CBC, kidney, vitamin, thyroid, lipid, pregnancy and sugar tests, led by experienced specialists.' },
  { title: 'Ultrasonography', img: '/img/services/ultra.jpg', text: 'Diagnostic ultrasound imaging of muscles, joints, blood vessels and internal organs, including obstetric scans.' },
  { title: 'Pharmacy', img: '/img/services/pharmacy.jpg', text: 'An in-house pharmacy open 24 hours. Our pharmacists advise patients and caregivers on dosage, administration and precautions.' },
  { title: 'Health check-ups', img: '/img/services/healthpackage.jpg', text: 'Affordable health check packages for men and women, including cardiac, eye, ENT and dental consultations and pulmonary function tests.' },
  { title: 'Insurance & cashless treatment', img: '/img/services/insurance.jpg', text: 'Cashless hospitalisation and hassle-free claims with major insurers, TPAs and government health schemes, including reimbursement for state government employees.' },
  { title: 'Patient support services', img: '/img/services/patient-support.jpg', text: 'Housekeeping, bio-cleaning of rooms and theatres, laundry and transport services that keep the hospital safe, hygienic and comfortable.' },
]

// Clinical support departments with their own pages (from the previous site's Treatments section)
const clinicalMeta = {
  physiotherapy: { title: 'Physiotherapy & rehabilitation', icon: 'M16 6v12a8 8 0 0 0 16 0V6M12 42v-6a12 12 0 0 1 24 0v6M18 30h12', text: 'Exercise therapy, functional training and rehabilitation after surgery, injury or illness.' },
  radiology: { title: 'Radiology & imaging', icon: 'M8 10h32v24H8zM16 40h16M24 34v6M14 22h6l3-6 4 12 3-6h4', text: 'Digital radiography, ultrasound and Doppler, CT, MRI and interventional procedures.' },
  laboratory: { title: 'Laboratory services', icon: 'M18 6h12M20 6v14L10 38a4 4 0 0 0 4 6h20a4 4 0 0 0 4-6L28 20V6M14 30h20', text: 'From routine blood tests to histopathology, microbiology and immunology.' },
  'blood-bank': { title: 'Blood bank', icon: 'M24 6S12 20 12 29a12 12 0 0 0 24 0C36 20 24 6 24 6zM19 30a5 5 0 0 0 5 5', text: 'Whole blood and components, with screening and apheresis facilities.' },
  dietetics: { title: 'Dietetics & clinical nutrition', icon: 'M24 14c-6-6-16-2-16 8 0 10 10 20 16 20s16-10 16-20c0-10-10-14-16-8zM24 14c0-4 2-8 6-8', text: 'Nutrition assessment and diet plans for inpatients and outpatients.' },
  'social-medicine': { title: 'Social medicine & community health', icon: 'M24 8a6 6 0 1 0 0 12 6 6 0 0 0 0-12zM10 40c0-8 6-14 14-14s14 6 14 14M8 22a4 4 0 1 0 0-8M40 22a4 4 0 1 0 0-8', text: 'Vaccination, travel health and preventive screening programmes.' },
}
export const clinicalPages = Object.entries(clinicalMeta).map(([slug, m]) => ({ slug, ...m }))
export const clinicalBySlug = slug => clinicalPages.find(c => c.slug === slug)

export const gallery = [
  { src: '/img/hospital-building-wide.jpg', cat: 'Hospital', alt: 'Hospital front entrance, Labbipet' },
  { src: '/img/gallery/staff.jpg', cat: 'Hospital', alt: 'Nursing and support staff team' },
  { src: '/img/gallery/reception.jpg', cat: 'Hospital', alt: 'Reception and front desk' },
  { src: '/img/dialysis-unit.jpg', cat: 'Hospital', alt: 'Dialysis unit with patients and care team' },
  { src: '/img/operation-theatre.jpg', cat: 'Hospital', alt: 'Operation theatre' },
  { src: '/img/gallery/lab.jpg', cat: 'Lab', alt: 'Laboratory' },
  { src: '/img/gallery/pharmacy.jpg', cat: 'Pharmacy', alt: 'In-house pharmacy' },
  { src: '/img/gallery/room.jpg', cat: 'Rooms', alt: 'Patient room' },
  { src: '/img/gallery/services-poster.jpg', cat: 'Hospital', alt: 'List of hospital services (Telugu)' },
]

export const videos = [
  { kind: 'file', src: '/video/sri-swarupa-hospital.mp4', poster: '/video/sri-swarupa-hospital.jpg', title: 'Sri Swarupa in under a minute (Telugu)' },
  { kind: 'youtube', id: '1JHnic9SRuk', title: 'Sri Swarupa Super Speciality Hospital' },
  { kind: 'youtube', id: 'hbCTxXQ-ZSI', title: 'Sri Swarupa Super Speciality Hospital' },
]

// Old sriswarupahospital.com URLs → new routes, so existing links and search results keep working
export const legacyRedirects = {
  'index.html': '/', 'about.html': '/about', 'doctors.html': '/doctors', 'contact.html': '/contact',
  'services.html': '/services', 'treatments.html': '/services#clinical', 'gallery.html': '/gallery', 'media.html': '/gallery', 'videos.html': '/videos',
  'nephrologist-in-vijayawada.html': '/departments/nephrology', 'best-urologist-in-vijayawada.html': '/departments/urology',
  'gynecologist-in-vijayawada.html': '/departments/gynecology-and-obstetrics', 'fertility&ivf-in-vijayawada.html': '/departments/fertility-and-ivf',
  'orthopedic-hospitals-in-vijayawada.html': '/departments/orthopaedics', 'anesthesiology-critical-care.html': '/departments/anesthesiology',
  'cardiac-clinic-in-vijayawada.html': '/departments/cardiac-clinic', 'best-pulmonalagist-in-vijayawada.html': '/departments/pulmonology',
  'neurologist-in-vijayawada.html': '/departments/neurology', 'best-gastrologist-in-vijayawada.html': '/departments/gastrology',
  'pediatrician-in-vijayawada.html': '/departments/pediatrician', 'drchandana_obstetrics&gynecology.html': '/doctors',
  'physiotherapy.html': '/services/physiotherapy', 'radiology.html': '/services/radiology', 'socialmedicine.html': '/services/social-medicine',
  'laboratory.html': '/services/laboratory', 'dietetics.html': '/services/dietetics', 'transfusion.html': '/services/blood-bank',
  'termsandconditions.html': '/terms', 'privacy_policy.html': '/privacy', 'cancellation_refund.html': '/refund',
}
