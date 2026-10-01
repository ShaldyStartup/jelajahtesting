(()=>{
const photo = (id, width = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=82`;
const destinations = [
  { id:'bali', name:'Bali', country:'Indonesia', region:'domestic', image:photo('photo-1537996194471-e657df975ab4') },
  { id:'lombok', name:'Lombok', country:'Indonesia', region:'domestic', image:photo('photo-1518548419970-58e3b4079ab2') },
  { id:'yogyakarta', name:'Yogyakarta', country:'Indonesia', region:'domestic', image:photo('photo-1555400038-63f5ba517a47') },
  { id:'labuan-bajo', name:'Labuan Bajo', country:'Indonesia', region:'domestic', image:photo('photo-1518509562904-e7ef99cdcc86') },
  { id:'jepang', name:'Jepang', country:'Asia Timur', region:'international', image:photo('photo-1493976040374-85c8e12f0c0e') },
  { id:'korea', name:'Korea Selatan', country:'Asia Timur', region:'international', image:photo('photo-1538485399081-7c8971f0a950') },
  { id:'singapura', name:'Singapura', country:'Asia Tenggara', region:'international', image:photo('photo-1525625293386-3f8f99389edd') },
];
const base = [
  ['bali-escape','Bali Escape 4D3N','bali','Ubud · Kuta',4,3,3500000,4.8,120,['beach','honeymoon'],'photo-1537996194471-e657df975ab4'],
  ['lombok-blue','Lombok Blue Horizon','lombok','Gili Trawangan · Senggigi',4,3,3850000,4.9,86,['beach','adventure'],'photo-1518548419970-58e3b4079ab2'],
  ['japan-sakura','Japan Sakura Journey','jepang','Tokyo · Kyoto · Osaka',7,6,12800000,4.9,92,['family','adventure'],'photo-1493976040374-85c8e12f0c0e'],
  ['jogja-culture','Jejak Budaya Yogyakarta','yogyakarta','Malioboro · Borobudur',3,2,2450000,4.7,64,['family'],'photo-1555400038-63f5ba517a47'],
  ['bajo-islands','Labuan Bajo Island Hopping','labuan-bajo','Komodo · Padar',5,4,6900000,4.9,78,['adventure','beach'],'photo-1518509562904-e7ef99cdcc86'],
  ['seoul-stories','Seoul Stories','korea','Seoul · Nami Island',5,4,9800000,4.8,58,['family','honeymoon'],'photo-1538485399081-7c8971f0a950'],
  ['singapore-weekend','Singapore City Escape','singapura','Marina Bay · Sentosa',3,2,5200000,4.7,47,['family'],'photo-1525625293386-3f8f99389edd'],
  ['bali-wellness','Bali Wellness Retreat','bali','Ubud · Canggu',5,4,6100000,4.9,72,['honeymoon'],'photo-1537996194471-e657df975ab4'],
  ['lombok-family','Lombok Family Getaway','lombok','Mandalika · Gili Air',3,2,3200000,4.7,35,['family','beach'],'photo-1518548419970-58e3b4079ab2'],
  ['japan-alps','Japan Alpine Discovery','jepang','Nagano · Matsumoto',6,5,11900000,4.8,42,['adventure'],'photo-1493976040374-85c8e12f0c0e'],
];
const routeDays = {
  bali:[['Ubud yang tenang',['Jalan pagi di sawah Tegallalang','Mencicipi hidangan khas Bali','Senja di pusat Ubud']],['Pesisir selatan',['Menjelajahi pantai dan pura tepi laut','Waktu bebas untuk menikmati matahari terbenam']],['Ruang untuk diri sendiri',['Pilihan aktivitas spa atau kelas memasak','Malam santai di Canggu']]],
  lombok:[['Laut dan pulau kecil',['Menyeberang ke Gili Air','Snorkeling di perairan jernih','Makan malam di tepi pantai']],['Dari desa ke pesisir',['Mengunjungi desa tenun lokal','Menjelajahi pantai Mandalika']],['Hari bebas di Lombok',['Pilih aktivitas laut atau waktu santai','Nikmati kuliner khas Lombok']]],
  yogyakarta:[['Jejak kerajaan',['Mengunjungi Keraton Yogyakarta','Berjalan di sekitar Taman Sari','Malam di Malioboro']],['Pagi di Borobudur',['Menikmati kawasan Borobudur','Mencicipi kuliner tradisional Jawa']]],
  'labuan-bajo':[['Pulau Padar',['Trekking ringan ke puncak Padar','Berlayar melewati gugusan pulau']],['Laut Flores',['Snorkeling di titik pilihan','Mengunjungi Pink Beach']],['Jejak Komodo',['Tur bersama pemandu lokal','Menikmati senja dari kapal']]],
  jepang:[['Tokyo dari dekat',['Menjelajahi Asakusa dan Senso-ji','Menikmati sore di Shibuya']],['Menuju Kyoto',['Perjalanan kereta antarkota','Jalan sore di Gion']],['Kuil dan taman',['Mengunjungi Fushimi Inari','Waktu bebas di Arashiyama']],['Osaka yang hidup',['Wisata kuliner Dotonbori','Menyusuri pusat kota']],['Hari pilihanmu',['Belanja suvenir atau jelajah mandiri','Malam terakhir bersama rombongan']]],
  korea:[['Seoul klasik',['Mengunjungi Gyeongbokgung','Menjelajahi Bukchon Hanok Village']],['Kota dan rasa',['Kuliner lokal di Myeongdong','Waktu bebas di Hongdae']],['Sehari di Nami',['Perjalanan ke Nami Island','Berfoto di jalanan pepohonan']]],
  singapura:[['Ikon kota',['Berjalan di Marina Bay','Menikmati Gardens by the Bay']],['Hari di Sentosa',['Menjelajahi Sentosa','Waktu bebas di tepi pantai']]]
};
const seedPackages = base.map((p,i)=>({
  id:`PKG-${String(i+1).padStart(3,'0')}`,slug:p[0],name:p[1],destinationId:p[2],locationLabel:p[3],durationDays:p[4],durationNights:p[5],price:p[6],rating:p[7],reviewCount:p[8],categories:p[9],images:[photo(p[10]),photo('photo-1566073771259-6a8506099945',800),photo('photo-1500534623283-312aade485b7',800)],published:true,
  description:`Rasakan perjalanan yang dirancang untuk menikmati setiap sudut ${destinations.find(d=>d.id===p[2]).name}, dari pengalaman lokal yang hangat sampai waktu luang untuk menemukan cerita Anda sendiri.`,
  hotel:{name:i===0?'Sthala Ubud Bali':'Hotel pilihan bintang 4',rating:4,location:p[3],image:photo('photo-1566073771259-6a8506099945')},
  transport:{type:'Kendaraan privat ber-AC',description:'Driver lokal berpengalaman dari titik penjemputan ke destinasi wisata.',meetingPoint:'Bandara tujuan'},
  includes:['Akomodasi sesuai itinerary','Transportasi lokal dan driver','Tiket masuk destinasi','Sarapan setiap hari'],
  excludes:['Tiket pesawat','Pengeluaran pribadi','Makan di luar itinerary'],
  itinerary:Array.from({length:p[4]},(_,n)=>{const stop=routeDays[p[2]][(n-1+routeDays[p[2]].length)%routeDays[p[2]].length];return {day:n+1,title:n===0?'Selamat datang':n===p[4]-1?'Sampai bertemu lagi':stop[0],activities:n===0?['Penjemputan di bandara','Check-in hotel','Makan malam selamat datang']:n===p[4]-1?['Sarapan santai','Waktu bebas','Transfer ke bandara']:stop[1]}}),
  cancellationPolicy:['H-14: refund 100%','H-7: refund 50%','Kurang dari H-7: non-refundable'],terms:'Jadwal dapat berubah menyesuaikan kondisi cuaca dan operasional setempat.',
  schedules:[0,1,2].map((n)=>({id:`SCH-${i+1}-${n+1}`,departureDate:new Date(Date.UTC(2026,10+n,12+(i%4))).toISOString().slice(0,10),capacity:20,remaining:12-n*3,active:true}))
}));
const promos = [
  {code:'JELAJAH500',type:'fixed',value:500000,minPurchase:5000000,maxDiscount:500000,startDate:'2026-01-01',endDate:'2027-12-31',active:true},
  {code:'BALI10',type:'percentage',value:10,minPurchase:2000000,maxDiscount:500000,startDate:'2026-01-01',endDate:'2027-12-31',active:true},
  {code:'LIBUR300',type:'fixed',value:300000,minPurchase:3000000,maxDiscount:300000,startDate:'2026-01-01',endDate:'2027-12-31',active:true},
];
const seedReviews = [
  {id:'REV-001',packageId:'PKG-001',name:'Nadia P.',rating:5,comment:'Semua detail terasa dipikirkan. Ubud di pagi hari jadi momen favorit saya.',createdAt:'2026-08-12'},
  {id:'REV-002',packageId:'PKG-001',name:'Andi R.',rating:5,comment:'Perjalanannya nyaman dan tim sangat membantu dari awal sampai akhir.',createdAt:'2026-07-09'},
  {id:'REV-003',packageId:'PKG-003',name:'Maya S.',rating:5,comment:'Jepang musim semi memang seindah itu. Itinerary pas, tidak terburu-buru.',createdAt:'2026-06-15'},
  {id:'REV-004',packageId:'PKG-002',name:'Rizky A.',rating:5,comment:'Air laut Lombok luar biasa. Hotel dan transportasinya juga memuaskan.',createdAt:'2026-05-22'},
  {id:'REV-005',packageId:'PKG-005',name:'Sarah D.',rating:5,comment:'Melihat matahari terbit dari Padar adalah pengalaman tak terlupakan.',createdAt:'2026-04-17'},
];
const seedBookings = [
  {id:'TRV-00121',userId:'USR-DEMO-1',customerName:'Aina Putri',packageId:'PKG-001',scheduleId:'SCH-1-1',departureDate:'2026-11-12',participantCount:2,participants:[{name:'Aina Putri',identityType:'KTP',identity:''},{name:'Dimas Putra',identityType:'KTP',identity:''}],contactPhone:'081234567890',contactEmail:'aina@example.com',notes:'',subtotal:7000000,discount:500000,total:6500000,promoCode:'JELAJAH500',bookingStatus:'waiting_verification',paymentStatus:'submitted',proofName:'bukti-transfer-demo.jpg',createdAt:'2026-09-26T09:00:00+07:00'},
  {id:'TRV-00122',userId:'USR-DEMO-2',customerName:'Raka Pratama',packageId:'PKG-003',scheduleId:'SCH-3-1',departureDate:'2026-11-14',participantCount:1,participants:[{name:'Raka Pratama',identityType:'Passport',identity:''}],contactPhone:'081234567891',contactEmail:'raka@example.com',notes:'',subtotal:12800000,discount:0,total:12800000,promoCode:'',bookingStatus:'confirmed',paymentStatus:'paid',createdAt:'2026-09-20T10:00:00+07:00'},
  {id:'TRV-00123',userId:'USR-DEMO-3',customerName:'Sari Wulandari',packageId:'PKG-005',scheduleId:'SCH-5-1',departureDate:'2026-11-12',participantCount:2,participants:[{name:'Sari Wulandari',identityType:'KTP',identity:''},{name:'Bima Wulandari',identityType:'KTP',identity:''}],contactPhone:'081234567892',contactEmail:'sari@example.com',notes:'',subtotal:13800000,discount:0,total:13800000,promoCode:'',bookingStatus:'waiting_payment',paymentStatus:'unpaid',createdAt:'2026-09-28T08:00:00+07:00'},
  {id:'TRV-00124',userId:'USR-DEMO-4',customerName:'Nadia Surya',packageId:'PKG-002',scheduleId:'SCH-2-2',departureDate:'2026-12-13',participantCount:1,participants:[{name:'Nadia Surya',identityType:'KTP',identity:''}],contactPhone:'081234567893',contactEmail:'nadia@example.com',notes:'',subtotal:3850000,discount:0,total:3850000,promoCode:'',bookingStatus:'confirmed',paymentStatus:'paid',createdAt:'2026-09-18T10:00:00+07:00'},
  {id:'TRV-00125',userId:'USR-DEMO-5',customerName:'Farhan Akbar',packageId:'PKG-006',scheduleId:'SCH-6-1',departureDate:'2026-11-13',participantCount:2,participants:[{name:'Farhan Akbar',identityType:'Passport',identity:''},{name:'Mira Akbar',identityType:'Passport',identity:''}],contactPhone:'081234567894',contactEmail:'farhan@example.com',notes:'',subtotal:19600000,discount:0,total:19600000,promoCode:'',bookingStatus:'waiting_verification',paymentStatus:'submitted',proofName:'bukti-seoul-demo.pdf',createdAt:'2026-09-27T11:00:00+07:00'},
];
const paymentProviders = {
  bank_transfer:{label:'Transfer Bank',description:'Transfer manual melalui aplikasi bank.',providers:[
    {id:'bca',name:'BCA',number:'123 456 7890',holder:'Jelajah Travel',instruction:'Transfer sesuai total tagihan, lalu simpan bukti transaksi.'},
    {id:'mandiri',name:'Bank Mandiri',number:'138 000 789 4567',holder:'Jelajah Travel',instruction:'Transfer sesuai total tagihan, lalu simpan bukti transaksi.'},
    {id:'bni',name:'BNI',number:'012 345 6789',holder:'Jelajah Travel',instruction:'Transfer sesuai total tagihan, lalu simpan bukti transaksi.'},
    {id:'bri',name:'BRI',number:'1234 01 000789 56',holder:'Jelajah Travel',instruction:'Transfer sesuai total tagihan, lalu simpan bukti transaksi.'}
  ]},
  virtual_account:{label:'Virtual Account',description:'Bayar melalui nomor virtual account bank pilihan.',providers:[
    {id:'bca',name:'BCA Virtual Account',number:'8808 1234 5678',instruction:'Pilih pembayaran Virtual Account di aplikasi bank, lalu masukkan nomor ini.'},
    {id:'mandiri',name:'Mandiri Virtual Account',number:'8950 1234 5678',instruction:'Pilih pembayaran Virtual Account di aplikasi bank, lalu masukkan nomor ini.'},
    {id:'bni',name:'BNI Virtual Account',number:'9880 1234 5678',instruction:'Pilih pembayaran Virtual Account di aplikasi bank, lalu masukkan nomor ini.'},
    {id:'bri',name:'BRI Virtual Account',number:'8888 1234 5678',instruction:'Pilih pembayaran Virtual Account di aplikasi bank, lalu masukkan nomor ini.'}
  ]},
  ewallet:{label:'E-Wallet',description:'Bayar melalui dompet digital pilihan.',providers:[
    {id:'dana',name:'DANA',number:'0812 3456 7890',holder:'Jelajah Travel',instruction:'Kirim ke nomor dompet digital ini sesuai total tagihan.'},
    {id:'gopay',name:'GoPay',number:'0812 3456 7891',holder:'Jelajah Travel',instruction:'Kirim ke nomor dompet digital ini sesuai total tagihan.'},
    {id:'ovo',name:'OVO',number:'0812 3456 7892',holder:'Jelajah Travel',instruction:'Kirim ke nomor dompet digital ini sesuai total tagihan.'},
    {id:'shopeepay',name:'ShopeePay',number:'0812 3456 7893',holder:'Jelajah Travel',instruction:'Kirim ke nomor dompet digital ini sesuai total tagihan.'}
  ]}
};
window.JelajahData = {destinations,seedPackages,promos,seedReviews,seedBookings,paymentProviders};
})();
