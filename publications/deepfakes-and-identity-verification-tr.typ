// A14 — Deepfake Çağında Kimlik Doğrulama. ÜRETİLMİŞ DOSYA: Markdown kaynağından md2typ.mjs ile üretilir; elle düzenleme.
// Derleme: powershell -File publications/build.ps1
#import "template.typ": conf, sekil, tablo, kutu, kod, kaynak, formul, adimlar
#let kutu = kutu.with(dil: "tr")
#let sekil = sekil.with(dil: "tr")

#show: conf.with(
  lang: "tr",
  dizi: "Tamga Network Akademik Çalışmalar",
  baslik: "Deepfake Çağında Kimlik Doğrulama",
  altbaslik: "Belge Fotoğrafı ve Selfie'den Çip ve İmzaya: Uzaktan Kimlik Doğrulamanın Sınırları",
  yazar: "Berke Karataş",
  kurum: "Tamga Network",
  tarih: "Şubat 2027",
  surum: "1.0",
  lisans: "© 2027 Berke Karataş. Bu eser Creative Commons Atıf 4.0 Uluslararası Lisansı (CC BY 4.0) ile yayımlanmıştır: kaynak gösterilerek paylaşılabilir ve uyarlanabilir. https://creativecommons.org/licenses/by/4.0/deed.tr",
  anahtar: ("uzaktan kimlik doğrulama", "deepfake", "canlılık tespiti", "sunum saldırısı", "enjeksiyon saldırısı", "ISO/IEC 30107", "ICAO 9303", "NFC", "pasif doğrulama", "PID", "sahip bağlama",),
  atif: "Karataş, B. (2027). Deepfake Çağında Kimlik Doğrulama: Belge Fotoğrafı ve Selfie'den Çip ve İmzaya: Uzaktan Kimlik Doğrulamanın Sınırları. Tamga Network Akademik Çalışmalar, A14. https://tamga.network/files/publications/deepfakes-and-identity-verification-tr.pdf",
  ozet-sayfasi: true,
  kisa-baslik: none,
  icindekiler: true,
  ozet: [
Bir banka hesabı açarken, bir kripto para borsasına üye olurken ya da bir işe uzaktan başvururken artık çoğumuz aynı üç adımı yaşıyoruz: kimlik kartımızın fotoğrafını çekiyoruz, ardından telefonun ön kamerasına bakıp başımızı çeviriyoruz, sonra bir yazılım bu iki görüntüyü karşılaştırıp karar veriyor. Bu yöntem, son on yılda şubeye gitmenin yerini aldı. Ama dayandığı varsayım, yani kameranın önünde gerçek bir insanın ve gerçek bir belgenin bulunduğu varsayımı, yapay zekâyla üretilen sahte yüzler ve belgeler karşısında giderek zayıflıyor. Yazı, uzaktan kimlik doğrulamanın nasıl çalıştığını, hangi saldırılarla karşı karşıya olduğunu ve bu saldırılara karşı geliştirilen canlılık tespiti yöntemlerini ve standartlarını (ISO\/IEC 30107, CEN\/TS 18099, ETSI TS 119 461) hiçbir ön bilgi varsaymadan anlatıyor.

Yazının ikinci yarısı, görüntünün yerine imzaya güvenmenin yolunu inceliyor. Pasaportlardaki ve yeni kimlik kartlarındaki çip, belgeyi veren devletin dijital imzasını taşır; telefonun yakın alan iletişimi (NFC) ile okunduğunda belgenin gerçek olup olmadığı bir matematik işlemiyle anlaşılır; görüntüyü yorumlamaya gerek kalmaz. Avrupa Dijital Kimlik Cüzdanı’ndaki imzalı kimlik bilgisi (PID) bu fikri bir adım öteye taşır. ICAO 9303’ün güvenlik mekanizmalarını adım adım açıklıyor, görüntüden imzaya geçişin neyi çözdüğünü ve neyi açıkta bıraktığını tartışıyoruz.
  ],
)

= Giriş: Ekrandaki Yüz Gerçekten Orada mı?

Dilnoza, Taşkent’te iktisat okumuş, yüksek lisans için İstanbul’a gelmiş bir öğrenci. Dizinin ilk yazısında başvurusunu takip ettiğimiz Aynur’la aynı bölümde okuyor. Burslu olduğu için harçlığı her ay bir yurt dışı havaleyle geliyor ve bu parayı kullanabilmek için bir banka hesabına ihtiyacı var. Bir dijital bankanın uygulamasını indiriyor. Uygulama önce pasaportunun fotoğraf sayfasını çekmesini istiyor; ekranda bir çerçeve beliriyor, pasaportu çerçeveye oturtuyor, flaş patlıyor. Sonra ön kamera açılıyor: "Yüzünüzü ovalin içine getirin. Şimdi başınızı yavaşça sola çevirin." Birkaç saniye sonra ekranda yeşil bir onay işareti çıkıyor. On dakika içinde hesabı açılmış, kartı yolda.

Aynı hafta, Dilnoza’nın hiç tanımadığı biri de aynı uygulamayı indiriyor. Elinde Dilnoza’nın sosyal medyada paylaştığı birkaç fotoğraf ve kısa bir video var. Pasaportun bir görüntüsünü, internette dolaşan şablonlardan birini Dilnoza’nın bilgileriyle doldurarak üretiyor. Ön kamera açıldığında kameranın önüne kendi yüzünü koymuyor; uygulamaya, gerçek kameradan geliyormuş gibi görünen ama aslında bilgisayarda üretilmiş bir görüntü akışı veriyor. Ekrandaki yüz başını sola çeviriyor, gözlerini kırpıyor, gülümsüyor. Bu yüz Dilnoza’nın yüzü. Ama kameranın önünde kimse yok.

Bu yazının sorusu bu iki sahnenin arasındaki farkı bir yazılımın nasıl anlayabileceği. Daha doğrusu, anlayabilir mi? Son yirmi yılda uzaktan kimlik doğrulama, bir belgenin ve bir yüzün #{strong[görüntüsüne]} bakarak karar veren yöntemler üzerine kuruldu. Bu yöntemler, görüntüyü taklit etmenin zor olduğu bir dünyada makul bir varsayıma dayanıyordu. Bugün ise gerçekçi bir yüz görüntüsü, bir ses kaydı ya da bir belge fotoğrafı üretmek, herkesin erişebildiği araçlarla mümkün. Bu araçlarla üretilen içeriğe #{strong[deepfake]} diyoruz. Kelime "derin öğrenme" (#{emph[deep learning]}) ile "sahte" (#{emph[fake]}) sözcüklerinin birleşimidir; Türkçede onu tam karşılayan yerleşik bir karşılık olmadığı için bu yazıda olduğu gibi kullanıyoruz.

Dizinin ilk yazısında fiziksel dünyadaki güvenin üç dayanağından söz etmiştik: belgeyi taklit etmenin zorluğu, işlemin yüz yüze yapılması ve belgeyi verenin tanınması. Uzaktan kimlik doğrulama, bu dayanaklardan ikincisini, yani yüz yüzeliği, kamerayla yeniden kurmaya çalışır. Deepfake’ler ise tam bu noktayı hedef alır: Kamera artık yüz yüzeliğin güvenilir bir taşıyıcısı olmaktan çıkıyor. Bu yazıda, bu durumun neden ortaya çıktığını ve buna karşı iki farklı yolu inceliyoruz. Birincisi, görüntünün gerçekten canlı bir insandan ve gerçek bir kameradan geldiğini anlamaya çalışan #{strong[canlılık tespiti]} ve onu ölçen standartlar. İkincisi, görüntüye güvenmeyi bırakıp belgenin içindeki #{strong[dijital imzaya]} güvenmeye dayanan yol: çipli belgeleri telefonla okumak ve nihayet kimliği baştan imzalı bir belge olarak cüzdanda taşımak.

Yazının planı şöyle: Bölüm 2 uzaktan kimlik doğrulamanın bugünkü işleyişini adım adım anlatıyor. Bölüm 3 deepfake’lerin ne olduğunu ve nasıl üretildiğini kavramsal düzeyde açıklıyor. Bölüm 4 saldırıları türlerine göre sınıflandırıyor; Bölüm 5 canlılık tespitini, ISO\/IEC 30107 standartlarını ve Avrupa’daki düzenlemeleri ele alıyor. Bölüm 6, pasaport ve kimlik kartlarındaki çipin nasıl okunduğunu ve neden görüntüden farklı bir güvence verdiğini ICAO 9303 üzerinden anlatıyor. Bölüm 7 imzalı kimlik bilgisine geçişi, Bölüm 8 yöntemlerin karşılaştırmasını, Bölüm 9 açık soruları tartışıyor. Ek A’da sözlük var.

#kutu("onemli", [Bir sınır notu])[
Bu yazı saldırıları yalnızca #{strong[kavramsal]} düzeyde anlatıyor: Hangi tür saldırının sistemin hangi noktasını hedef aldığını ve neden işe yarayabildiğini açıklıyoruz. Bir saldırının nasıl yapılacağına dair araç, yöntem ya da adım vermiyoruz. Amaç, savunmayı tasarlayan ve sistemi seçen kişilerin tehdidi doğru anlamasıdır.
]

= Uzaktan Kimlik Doğrulama Nasıl Çalışır?

== Neden kimliği uzaktan doğrulamamız gerekiyor?

Bir bankanın, Dilnoza’ya hesap açmadan önce onun gerçekten Dilnoza olduğundan emin olması bir tercih olmanın ötesinde yasal bir yükümlülüktür. Kara paranın aklanmasını ve terörün finansmanını önlemeye yönelik düzenlemeler, bankalardan ve birçok finans kuruluşundan "müşterini tanı" (#{emph[know your customer]}, kısaca KYC) adı verilen bir süreç ister: Müşterinin kimliği güvenilir bir kaynağa dayanarak tespit edilmeli ve kayda geçirilmelidir. Yıllarca bunun tek yolu şubeydi. Görevli kimliği eline alır, fotoğrafla yüzü karşılaştırır, fotokopisini çeker.

Akıllı telefonların yaygınlaşmasıyla bu süreç uzaktan yapılmaya başlandı. Alan yazında buna #{strong[uzaktan kimlik doğrulama]} (#{emph[remote identity proofing]} ya da #{emph[identity verification]}, kısaca IDV) denir. Burada dizinin ilk yazısındaki bir ayrımı hatırlatmakta fayda var. Kimlik doğrulama iki farklı işi anlatabilir. Birincisi, bir kişinin kimliğinin #{strong[ilk kez]} tespit edilmesidir: "Bu kişi, bu pasaportta adı yazan kişi mi?" Buna #{strong[kimlik kanıtlama]} (#{emph[identity proofing]}) denir. İkincisi, daha önce tanınmış bir kişinin #{strong[yeniden]} tanınmasıdır: "Bu hesaba giren kişi, hesabı açan kişi mi?" Buna #{strong[kimlik doğrulama]} (#{emph[authentication]}) denir. Bu yazının konusu çoğunlukla birincisi. Deepfake’ler ikincisini de etkiler, ama en büyük zararı, sahte bir kimliğin sisteme ilk girdiği anda verir; çünkü sonraki her işlem o ilk kararın üstüne kurulur.

Uzaktan kimlik kanıtlamaya ihtiyaç duyan alanlar bankacılıkla sınırlı değil: ödeme kuruluşları, sigorta, telekom hat aboneliği, araç paylaşımı, uzaktan işe alım, çevrimiçi sınavlar, nitelikli elektronik sertifika verilmesi. Avrupa Birliği’nde bir güven hizmeti sağlayıcının kişiye nitelikli sertifika vermeden önce kimliğini doğrulaması eIDAS tüzüğünün 24. maddesiyle düzenlenir \[16\]; Türkiye’de bankaların uzaktan müşteri edinimi 2021’den beri ayrı bir yönetmelikle tanımlıdır \[18\].

== Tipik bir uzaktan doğrulama hattı

Kullanılan ürün ne olursa olsun, bugünkü uzaktan kimlik doğrulama sistemlerinin büyük çoğunluğu aynı temel adımlardan geçer (Şekil 1). Bu adımları Dilnoza’nın deneyimi üzerinden sırayla açalım.

#sekil(1, [Görüntü tabanlı uzaktan kimlik doğrulamanın tipik adımları], "figures/a14/sekil-1.svg", yarim: false)

#{strong[Belge yakalama.]} Uygulama, kullanıcıdan kimlik belgesinin fotoğrafını ister. Çoğu sistem fotoğrafı kullanıcının galerisinden değil, doğrudan kameradan alır; çünkü galeriden yüklenen bir görüntünün daha önce düzenlenip düzenlenmediğini bilmek zordur. Kamera açıkken yazılım, belgenin çerçeveye oturduğunu, bulanık olmadığını ve parlama içermediğini kontrol eder; bazen kartın eğik tutulmasını ister ki hologram gibi açıya göre değişen öğeler görünsün.

#{strong[Belge kontrolleri.]} Görüntü sunucuya ulaştığında bir dizi kontrolden geçer. Belge türü tanınır (hangi ülkenin hangi sürüm kimlik kartı?) ve bilinen şablonla karşılaştırılır: yazı tipleri, alanların yerleri, arka plan desenleri. Görüntüden okunabilen güvenlik öğeleri aranır. Pasaportlarda ve birçok kimlik kartında bulunan #{strong[makinece okunabilir bölge]} (#{emph[machine readable zone]}, MRZ), yani belgenin altındaki iki ya da üç satırlık, #{raw("<")} işaretleriyle dolu metin okunur. MRZ’deki her önemli alanın sonunda bir #{strong[sağlama hanesi]} vardır; yazılım bu haneleri yeniden hesaplar ve belgenin ön yüzündeki bilgilerle MRZ’deki bilgilerin tutarlı olup olmadığına bakar. Bu kontroller kaba sahtecilikleri yakalar. Ama hepsi bir #{strong[görüntünün]} üzerinde yapılır ve iyi üretilmiş bir sahte görüntü bu kontrollerin hepsinden geçebilir; sağlama haneleri herkesin bildiği bir formülle hesaplanır.

#{strong[Selfie ve canlılık.]} Ardından ön kamera açılır. Kullanıcıdan bir fotoğraf ya da birkaç saniyelik bir video istenir. Bu noktada sistem iki ayrı soruya cevap arar. Birincisi: Bu yüz, belgedeki portreyle aynı kişiye mi ait? İkincisi, ve deepfake çağında daha zor olanı: Bu yüz, şu anda kameranın önünde duran #{strong[canlı]} bir insana mı ait? İkinci soruya cevap veren yönteme #{strong[canlılık tespiti]} (#{emph[liveness detection]}) denir; standartlardaki adıyla #{strong[sunum saldırısı tespiti]} (#{emph[presentation attack detection]}, PAD). Bölüm 5’te ayrıntısıyla döneceğiz.

#{strong[Yüz karşılaştırma.]} Belgedeki portre ile canlı yüz görüntüsü bir yüz tanıma algoritmasına verilir. Algoritma iki görüntünün aynı kişiye ait olma olasılığını yansıtan bir #{strong[benzerlik puanı]} üretir. Puan önceden belirlenmiş bir eşiğin üstündeyse eşleşme kabul edilir.

#kutu("teknik", [Bir yüz karşılaştırma algoritması aslında ne yapar?])[
Modern yüz tanıma sistemleri bir yüz görüntüsünü doğrudan başka bir görüntüyle karşılaştırmaz. Önce her görüntüden, yüzün özelliklerini sayılarla özetleyen sabit uzunlukta bir #{strong[öznitelik vektörü]} (#{emph[embedding]} ya da #{emph[template]}) çıkarır. Bu vektör çoğunlukla birkaç yüz sayıdan oluşur ve derin öğrenmeyle eğitilmiş bir sinir ağı tarafından üretilir. Ağ, aynı kişinin farklı fotoğraflarından çıkan vektörlerin birbirine yakın, farklı kişilerin vektörlerinin birbirinden uzak düşmesi için eğitilmiştir.

İki vektörün yakınlığı genellikle aralarındaki açının kosinüsüyle ölçülür. $bold(a)$ ve $bold(b)$ iki yüzden çıkan vektörler, $theta$ aralarındaki açı olsun. Benzerlik, iki vektörün iç çarpımının uzunluklarının çarpımına bölünmesiyle bulunur:

#formul[$ "benzerlik" = cos theta = (bold(a) dot bold(b)) / (norm(bold(a)) dot norm(bold(b))) $]

İki vektör tam aynı yöne bakıyorsa benzerlik 1, birbirine dik duruyorsa 0’dır. Sistem bir #{strong[eşik]} seçer; örneğin 0,6’nın üstündeki benzerlikleri "aynı kişi" sayar.

Eşik seçimi iki tür hata arasında bir ödünleşimdir. #{strong[Yanlış eşleşme oranı]} (#{emph[false match rate]}, FMR), farklı iki kişinin yanlışlıkla aynı kişi sayılma sıklığıdır. #{strong[Yanlış eşleşmeme oranı]} (#{emph[false non-match rate]}, FNMR), aynı kişinin yanlışlıkla farklı kişi sayılma sıklığıdır. Eşik yükseldikçe FMR düşer ama FNMR artar. Küçük bir hesap ölçeği gösterir (değerler örnektir): FMR’si on binde bir olan bir sistem bir milyon sahte denemeyle karşılaşırsa, beklenen yanlış eşleşme sayısı oran ile deneme sayısının çarpımıdır:

#formul[$ "yanlış eşleşme" = "FMR" dot "deneme sayısı" = 10^(-4) dot 10^6 = 100 $]

Saldırgan için bu yüz deneme, sisteme girmiş yüz sahte hesap demektir.

Ama deepfake saldırılarda asıl sorun bu oran değildir. Saldırgan zaten #{strong[doğru kişinin]} yüzünü, yani Dilnoza’nın yüzünü gösterir. Yüz karşılaştırma algoritması bu durumda tam da yapması gerekeni yapar ve "aynı kişi" der. Karşılaştırma doğru çalışır; sorun, karşılaştırılan görüntünün kaynağındadır.
]

#{strong[Risk sinyalleri ve karar.]} Son olarak sistem, görüntülerin dışındaki sinyallere de bakar: Başvuru hangi cihazdan, hangi ağdan geliyor? Aynı cihazdan kısa sürede çok sayıda başvuru yapılmış mı? Aynı yüz başka bir adla daha önce görülmüş mü? Belge numarası iptal edilmiş belgeler listesinde mi? Bu sinyaller bir araya getirilerek başvuru otomatik olarak kabul edilir, reddedilir ya da bir insan incelemecinin önüne düşer.

== İki ana model: otomatik akış ve görüntülü görüşme

Uzaktan kimlik doğrulamanın iki ana uygulama biçimi vardır. #{strong[Otomatik]} modelde yukarıdaki adımların hepsi yazılım tarafından yapılır ve insan yalnızca şüpheli durumlarda devreye girer. #{strong[Görüntülü görüşme]} modelinde ise kullanıcı, eğitimli bir görevliyle canlı bir görüntülü görüşme yapar; görevli belgeyi kameraya göstermesini, eğip bükmesini, bazı soruları cevaplamasını ister. Bazı ülkeler yıllarca yalnızca ikinci modeli kabul etti. Türkiye’de 2021’de yürürlüğe giren bankacılık yönetmeliği de uzaktan kimlik tespitini "çevrimiçi, kesintisiz, görüntülü ve gerçek zamanlı" bir görüşme olarak tanımlar ve görevlinin belgenin doğruluğunu ve kişinin canlılığını tespit edici yöntemler kullanmasını şart koşar \[18\].

İnsanın sürece katılması bazı saldırıları zorlaştırır; deneyimli bir görevli, kağıt üzerindeki bir fotoğrafı ya da ekrandaki bir videoyu çoğu zaman fark eder. Ama deepfake çağında bu avantaj da aşınıyor. Bölüm 3’te göreceğimiz gibi, gerçek zamanlı yüz değiştirme araçları bir görüntülü görüşmede bile ikna edici olabiliyor. Üstelik görevlinin gördüğü görüntü de sonuçta bir kameradan, bir yazılımdan ve bir ağdan geçerek gelir. Görevli ekranındaki görüntünün gerçek bir kameradan gelip gelmediğini, yazılımın sınayabileceğinden daha iyi sınayamaz.

== Bu yöntemin gizli varsayımı

Şekil 1’deki adımların hepsinin ortak bir varsayımı var: #{strong[Sisteme ulaşan görüntüler, gerçek dünyada kameranın önünde duran bir belgenin ve bir insanın kaydıdır.]} Belge kontrolleri, görüntünün bir fiziksel belgenin fotoğrafı olduğunu varsayar. Canlılık tespiti, kameranın önünde bir şey durduğunu ve bunun canlı bir yüz mü yoksa bir taklit mi olduğunu ayırt etmeye çalışır. Yüz karşılaştırma, iki görüntünün de gerçek olduğunu varsayar ve yalnızca aynı kişiye ait olup olmadıklarına bakar.

Dizinin ilk yazısında, dijital dünyada bir dosyanın kopyasının aslıyla bit bit aynı olduğunu söylemiştik. Bir görüntü de bir dosyadır. Görüntü tabanlı kimlik doğrulama, bu temel gerçeğe karşı #{strong[algıyla]} savunma yapar: Görüntüdeki ince izlerden (ışık yansımaları, doku, hareket, sıkıştırma kalıntıları) gerçeği sahteden ayırmaya çalışır. Bu bir silahlanma yarışıdır; sahte üretim daha iyi hâle geldikçe izler azalır, tespit de daha zor hâle gelir. Bu yazının ikinci yarısındaki ana fikir, bu yarışın dışına çıkmanın bir yolunun olduğudur: görüntüyü yorumlamak yerine, belgenin içindeki bir #{strong[imzayı]} doğrulamak.

#kutu("onemli", [Bu bölümden akılda kalması gereken])[
Bugünkü uzaktan kimlik doğrulama, bir belgenin ve bir yüzün görüntüsünü yorumlayarak karar verir. Yüz karşılaştırma iki görüntünün aynı kişiye ait olup olmadığını söyler; görüntülerin gerçek olup olmadığını söylemez. Bu ikinci soruyu cevaplama işi canlılık tespitine ve belge kontrollerine kalır ve deepfake’ler tam bu işi zorlaştırır.
]

= Deepfake Nedir?

== Kısa bir tarihçe

Görüntüleri değiştirmek fotoğrafçılık kadar eskidir; on dokuzuncu yüzyılda bile fotoğraflardan kişiler silindi, başka fotoğraflardan kafalar eklendi. Ama bu işler yetenek, zaman ve uzmanlık istiyordu ve sonuç dikkatli bir göze çoğu zaman bir iz bırakıyordu. Değişikliği getiren, makinelerin görüntüyü #{strong[taklit etmeyi öğrenmesi]} oldu.

#kutu("tarihce", [Sahte yüzün kısa tarihi])[
#{strong[2014 — Üretici çekişmeli ağlar.]} Bir araştırma grubu, iki sinir ağını birbirine karşı yarıştıran bir yöntem önerdi: Bir ağ sahte görüntü üretir, diğeri gerçeği sahteden ayırmaya çalışır; ikisi birlikte gelişir \[1\]. #{strong[Üretici çekişmeli ağ]} (#{emph[generative adversarial network]}, GAN) adı verilen bu yöntem, birkaç yıl içinde gerçek fotoğraftan ayırt edilmesi zor yapay yüzler üretebilir hâle geldi.

#{strong[2014 — Yüz harmanlama.]} Aynı yıl başka bir çalışma, iki farklı kişinin yüzünün harmanlanmasıyla elde edilen bir pasaport fotoğrafının, otomatik yüz tanıma sistemlerinde her iki kişiyle de eşleşebildiğini gösterdi \[13\]. "Sihirli pasaport" adıyla anılan bu çalışma, belge fotoğraflarının kendisinin de bir saldırı aracı olabileceğini ortaya koydu.

#{strong[2017 — Terimin doğuşu.]} "Deepfake" kelimesi, 2017’nin sonunda bir çevrimiçi forumda, derin öğrenmeyle videolardaki yüzleri değiştiren içerikler için kullanılmaya başlandı. Kelime, #{emph[deep learning]} (derin öğrenme) ile #{emph[fake]} (sahte) kelimelerinin birleşimidir.

#{strong[2020’ler — Yaygınlaşma.]} Yeni üretici modeller (özellikle #{strong[difüzyon modelleri]}) yüz, ses ve belge görüntüsü üretmeyi birkaç komut yazmak kadar kolaylaştırdı. Gerçek zamanlı yüz değiştirme, sıradan bir bilgisayarda bir görüntülü görüşme sırasında çalışabilir hâle geldi.

#{strong[2024 — Hukuki tanım.]} Avrupa Birliği’nin yapay zekâ tüzüğü, deepfake’i hukuken tanımladı: gerçek kişilere, nesnelere, yerlere ya da olaylara belirgin biçimde benzeyen ve kişiye gerçekmiş gibi görünecek olan, yapay zekâyla üretilmiş ya da değiştirilmiş görüntü, ses ya da video içeriği \[17\].
]

== Deepfake nasıl üretilir: kavramsal bir bakış

Deepfake tek bir teknik değildir; birkaç farklı yaklaşımın ortak adıdır. Kimlik doğrulama açısından dört türü ayırmak yararlıdır, çünkü her biri sistemin farklı bir varsayımını zorlar.

#{strong[Yüz değiştirme]} (#{emph[face swap]}): Bir videodaki kişinin yüzü, başka bir kişinin yüzüyle değiştirilir; baş hareketleri, ifade ve ışık kaynak videodan gelir, yüz hatları hedef kişiden. Saldırgan kendi başını hareket ettirir, ekranda hedef kişinin yüzü hareket eder.

#{strong[Yeniden canlandırma]} (#{emph[face reenactment]}): Hedef kişinin tek bir fotoğrafı, başka birinin hareketleriyle "canlandırılır". Yani saldırganın elinde yalnızca bir profil fotoğrafı olsa bile, o fotoğraftaki yüzü göz kırpan, başını çeviren, konuşan bir videoya dönüştürmek mümkündür. Canlılık tespitinin "başınızı sola çevirin" türündeki komutlarını hedef alan saldırıların temeli budur.

#{strong[Tümüyle sentetik yüz]}: Hiçbir gerçek kişiye ait olmayan, sıfırdan üretilmiş bir yüz. Bu tür yüzler, gerçek bir kişinin kimliğini çalmak için kullanılmaz; #{strong[hiç var olmamış]} bir kişi adına hesap açmaya yarar. Alan yazında buna #{strong[sentetik kimlik]} dolandırıcılığı denir: Gerçek ve sahte bilgilerin karışımından oluşan, ama arkasında gerçek bir insan bulunmayan bir kimlik.

#{strong[Belge üretimi]}: Aynı üretici modeller, belge görüntüsü üretmek için de kullanılabilir. Bir kimlik kartının şablonu, yazı tipi, arka plan deseni ve hatta ışıklandırma koşulları taklit edilerek "bir masanın üstünde çekilmiş gibi" duran bir belge fotoğrafı üretilebilir.

#kutu("teknik", [Yüz değiştirmenin arkasındaki fikir])[
İlk yüz değiştirme yöntemlerinin çoğu #{strong[otomatik kodlayıcı]} (#{emph[autoencoder]}) adı verilen bir yapıya dayanır. Otomatik kodlayıcı iki parçadan oluşur: bir #{strong[kodlayıcı]}, görüntüyü çok daha küçük bir sayı dizisine sıkıştırır; bir #{strong[kod çözücü]}, bu diziden görüntüyü yeniden kurar. Yüz değiştirmede tek bir ortak kodlayıcı ve iki ayrı kod çözücü eğitilir: Kodlayıcı her iki kişinin yüzlerinden ortak bilgiyi (baş açısı, ifade, ışık) çıkarmayı öğrenir; her kod çözücü ise yalnızca bir kişinin yüzünü yeniden kurmayı öğrenir.

Eğitimden sonra A kişisinin bir görüntüsü ortak kodlayıcıya verilir, ama çıkan dizi #{strong[B kişisinin]} kod çözücüsüne gönderilir. Sonuç, A’nın baş açısı ve ifadesiyle duran B’nin yüzüdür. Videonun her karesine bu işlem uygulanınca A’nın hareketleriyle konuşan bir B ortaya çıkar.

Difüzyon modelleri farklı bir yoldan gider: Saf gürültüden başlayıp adım adım gürültüyü azaltarak bir görüntü "geliştirir"; her adımda hangi gürültünün kaldırılacağını, gerçek görüntülerle eğitilmiş bir ağ tahmin eder. Bu modeller tek bir fotoğraftan ya da bir metin tarifinden yüksek çözünürlüklü, tutarlı görüntüler üretebilir.

Kimlik doğrulama açısından önemli olan şudur: Bu yöntemlerin hepsi, gerçek görüntülerin istatistiksel özelliklerini taklit etmek üzere eğitilir. Bir tespit yöntemi belirli bir izi (örneğin göz kırpmanın doğal olmayan sıklığını) yakalamayı öğrendiğinde, bir sonraki üretici model bu izi de taklit etmeyi öğrenebilir.
]

== Sahadan işaretler

Deepfake’lerin kimlik doğrulamaya etkisi hakkında konuşurken rakamlara dikkatli yaklaşmak gerekiyor. Bu alanda dolaşan istatistiklerin büyük kısmı, kendi tespit ürününü satan şirketlerin raporlarından gelir; yöntemleri her zaman açık değildir ve birbirleriyle karşılaştırılamazlar. Bu yazıda yalnızca resmî kurumların kendi kaynaklarından aktardığı bilgilere yer veriyoruz.

Amerika Birleşik Devletleri Hazinesi’ne bağlı Mali Suçlar Uygulama Ağı (FinCEN), Kasım 2024’te finans kuruluşlarına deepfake’lerle ilgili bir uyarı yayımladı \[3\]. Uyarıya göre FinCEN, 2023’ten itibaren finans kuruluşlarının şüpheli işlem bildirimlerinde, dolandırıcılık amacıyla deepfake içerik kullanıldığından şüphelenilen vakalarda belirgin bir artış gördü. Bildirilen vakaların bir kısmında suçlular, kimlik doğrulama adımlarını aşmak için üretici yapay zekâyla belgeleri değiştirmiş ya da sıfırdan sahte kimlik belgeleri üretmiş; bu yolla açtıkları hesapları başka dolandırıcılıkların parasını aktarmak için kullanmıştı.

Şubat 2024’te Hong Kong polisi, çok uluslu bir şirketin Hong Kong’daki bir çalışanının, şirketin mali işler yöneticisi ve başka çalışanlar gibi görünen kişilerle yaptığı bir görüntülü toplantının ardından yaklaşık 200 milyon Hong Kong doları aktardığını açıkladı. Polisin açıklamasına göre toplantıdaki çalışan dışındaki herkes sahteydi \[2\]. Bu olayda bir kimlik kanıtlama sistemi aşılmadı, bir insan kandırıldı. Ama önemli bir şeyi gösterdi: Birden fazla kişinin aynı anda gerçek zamanlı olarak taklit edildiği bir görüntülü görüşme, artık bir bilim kurgu senaryosu değil.

Avrupa Birliği Siber Güvenlik Ajansı (ENISA), 2022’de uzaktan kimlik kanıtlamaya yönelik saldırıları ve karşı önlemleri ele alan bir rapor yayımladı \[4\]. Raporun dayandığı ankette katılımcıların çoğunluğu, gelecek için en endişe verici saldırı türü olarak deepfake’leri gösterdi. Raporun yayımlandığı tarihten bu yana üretici modellerin ne kadar geliştiği düşünüldüğünde, bu değerlendirmenin bugün daha da geçerli olduğunu söylemek abartı olmaz.

#kutu("ornek", [Dilnoza’nın fotoğrafları])[
Dilnoza’nın sosyal medya hesabında yüzünü farklı açılardan gösteren onlarca fotoğraf ve konuştuğu birkaç kısa video var. Üniversitenin internet sitesinde bir etkinlik fotoğrafı, bir konferans programında da vesikalık bir fotoğrafı yayımlanmış. Bunların hiçbiri gizli değil. Bir saldırgan için bu, yeniden canlandırma ya da yüz değiştirme modelini beslemeye yetecek kadar malzeme demek. Parolalardan farklı olarak yüz bir sır değildir; herkes görebilir ve değiştirilemez. Dizinin ilk yazısında biyometrinin zayıf yanı olarak "bir kez sızarsa sonsuza dek sızmış olur" demiştik. Yüz söz konusu olduğunda sızmaya bile gerek yok.
]

= Saldırılar: Kamera Önünde, Kameranın Arkasında, Belgede

Uzaktan kimlik doğrulamaya yönelik saldırıları anlamanın en kolay yolu, bir görüntünün kameranın önündeki dünyadan doğrulama sunucusuna kadar izlediği yolu takip etmektir (Şekil 2). Bu yolun her noktası bir saldırı noktasıdır ve her nokta farklı bir savunma gerektirir.

#sekil(2, [Bir görüntünün yolu ve saldırı noktaları], "figures/a14/sekil-2.svg", yarim: false)

== Sunum saldırıları: kameranın önünde

En eski ve en kolay anlaşılır saldırı türü, kameranın önüne gerçek yüz yerine bir #{strong[taklit]} koymaktır. Standartlar bu taklide #{strong[sunum saldırısı aracı]} (#{emph[presentation attack instrument]}) der ve saldırının kendisini "bir biyometrik yakalama alt sistemine, sistemin işleyişine müdahale etmek amacıyla bir yapay nesnenin ya da insan özelliklerinin sunulması" olarak tanımlar \[6, 9\]. Bu tanımın ilginç yanı, yalnızca sahte nesneleri değil, gerçek insan özelliklerinin hileli kullanımını da kapsamasıdır; örneğin birinin uyurken ya da bilinci yerinde değilken yüzünün kameraya tutulması.

Sunum saldırısı araçları basitten karmaşığa sıralanabilir: kâğıda basılmış bir fotoğraf; gözleri ve ağzı oyulmuş bir fotoğraf maskesi; bir tablet ya da telefon ekranında oynatılan video; silikon ya da reçineden yapılmış üç boyutlu maske; görünümü değiştiren ağır makyaj. Deepfake’ler bu listeye kendi başlarına yeni bir araç eklemez; ama ekranda oynatılan videonun içeriğini çok daha inandırıcı kılar. Eskiden ekrandaki videonun hedef kişinin gerçek bir kaydı olması gerekirdi; şimdi hedef kişinin tek bir fotoğrafından, istenen hareketleri yapan bir video üretilebilir.

Sunum saldırısının önemli bir sınırı vardır: Taklit, #{strong[gerçek bir kameranın önünden]} geçmek zorundadır. Basılı fotoğraf kâğıt dokusu taşır, ekran pikselleri ve yansımalar üretir, maske ten gibi ışık yansıtmaz. Canlılık tespiti bu fiziksel izleri yakalamaya çalışır. Bu yüzden standartlar sunum saldırılarını ilk tür saldırı olarak (Tip 1) ayrı tutar \[10\].

== Enjeksiyon saldırıları: kameranın arkasında

İkinci tür saldırıda kameranın önüne hiçbir şey konmaz. Saldırgan, sahte görüntüyü kameranın #{strong[arkasından]}, yani yazılımın görüntüyü aldığı noktadan sisteme sokar. Bu saldırılara #{strong[enjeksiyon saldırısı]} (#{emph[injection attack]}) denir; Avrupa standardizasyon komitesinin 2024’te yayımladığı teknik şartname, bunları "biyometrik veri enjeksiyon saldırısı" adıyla ayrı bir sınıf (Tip 2) olarak tanımlar \[10\].

Kavramsal olarak enjeksiyonun gerçekleşebileceği birkaç yer vardır. Uygulama, işletim sisteminden "kameradan görüntü ver" diye ister; işletim sistemi gerçek kamera yerine bir yazılımın ürettiği görüntüyü verirse uygulama farkı bilmeyebilir. Buna #{strong[sanal kamera]} denir; aslında görüntülü görüşme programlarında arka plan efektleri için meşru olarak da kullanılan bir teknolojidir. Uygulama gerçek bir telefon yerine bir bilgisayarda taklit edilen bir telefonda, yani bir #{strong[emülatörde]} çalıştırılabilir. Uygulamanın kendisi değiştirilip kamera adımı atlatılabilir. Ya da görüntü, uygulamadan sunucuya giderken yolda değiştirilebilir.

Enjeksiyon saldırılarını deepfake çağında özellikle tehlikeli yapan şey şudur: #{strong[Görüntü hiçbir fiziksel ortamdan geçmez.]} Ekran yansıması yok, kâğıt dokusu yok, maske kenarı yok. Sunum saldırısı tespitinin aradığı fiziksel izlerin hiçbiri oluşmaz. Üretici model, gerçeğinden ayırt edilemeyen bir "kameradan gelmiş gibi" görüntü akışı üretebildiği ölçüde, yalnızca görüntüye bakan bir canlılık tespiti onu yakalamakta zorlanır. ABD Ulusal Standartlar ve Teknoloji Enstitüsü (NIST) de yazılım tabanlı canlılık tespitini değerlendirdiği 2023 raporunda, değerlendirmenin enjeksiyon saldırıları hakkında hiçbir şey söylemediğini açıkça not eder \[9\].

Enjeksiyon saldırılarına karşı savunma bu yüzden görüntünün içeriğinden çok, #{strong[görüntünün kaynağına]} bakar: Uygulama gerçek bir cihazda mı, değiştirilmemiş hâliyle mi çalışıyor? Görüntü gerçekten donanım kamerasından mı geliyor? Görüntü akışı, cihazdan sunucuya değiştirilmeden mi ulaştı? Bu sorular, dizinin onuncu yazısında ayrıntılı ele aldığımız #{strong[cihaz doğrulama]} (#{emph[device attestation]}) konusuna bağlanır: Telefonun güvenli donanımının, üzerinde çalışan uygulamanın değiştirilmemiş olduğunu imzalı bir beyanla kanıtlaması. Burada önemli bir gözlem var: Enjeksiyona karşı en güçlü savunmalar zaten bir tür #{strong[kriptografik]} savunmadır. Güçlerini görüntünün kendisinden çok, onu üreten ortamın imzalı beyanından alırlar. Bölüm 6 ve 7’de bu fikri belgenin kendisine uygulayacağız.

== Belge saldırıları

Kimlik doğrulama hattının diğer kolu belgedir ve belgeye yönelik saldırıların da birkaç türü vardır.

#{strong[Sahte belge görüntüsü.]} Gerçek bir belgenin fiziksel olarak sahtesini yapmak pahalı ve zordur; pasaportlar ve kimlik kartları tam bu yüzden özel kâğıtlar, mürekkepler ve hologramlarla basılır. Ama uzaktan doğrulamada saldırganın fiziksel bir belge üretmesine gerek yoktur; yalnızca belgenin #{strong[görüntüsünü]} üretmesi yeterlidir. Dizinin ilk yazısında, dijital dünyada taklit zorluğunun belgenin fiziksel yapısından gelemeyeceğini söylemiştik. Görüntü tabanlı doğrulama, belgenin fiziksel güvenlik öğelerinin çoğunu, örneğin dokunarak hissedilen kabartmaları, ultraviyole ışıkta görünen mürekkepleri, kâğıdın dokusunu, zaten göremez. Geriye kalan, bir fotoğrafta görünen öğelerdir ve bunlar taklit edilebilir.

#{strong[Harmanlanmış portre]} (#{emph[morphing]}). Bölüm 3.1’de söz ettiğimiz bu saldırı, belgenin #{strong[kendisinin gerçek]} olduğu durumda bile işe yarar. İki kişinin yüzü harmanlanarak, her ikisine de yeterince benzeyen bir portre üretilir. Bu portreyle gerçek bir pasaport başvurusu yapılır; belge veren kurum gerçek bir pasaport basar. Artık iki kişi de aynı pasaportla otomatik yüz karşılaştırmasından geçebilir \[13\]. Bu saldırının hedefi belge kontrolü olmaktan çok belgenin #{strong[verilme]} aşamasıdır ve bu yüzden yalnızca çipi okumak da onu tek başına çözmez; çipin içindeki portre de aynı harmanlanmış portredir.

#{strong[Çalıntı ya da kiralık gerçek belge.]} Belki de en eski yöntem: Gerçek bir belge, sahibinin bilgisiyle ya da bilgisi olmadan başka biri tarafından kullanılır. Belge tamamen gerçektir; sorun, belgeyi gösteren kişinin belgenin sahibi olmamasıdır. Bu durumda savunma yine yüz karşılaştırmaya ve canlılığa düşer.

== Saldırının insan tarafı

Teknik saldırıların yanında, kimlik doğrulama sistemlerini asıl zorlayan bazı durumların teknikle ilgisi yoktur. #{strong[Para katırı]} (#{emph[money mule]}) denen kişiler, kendi gerçek kimlikleriyle hesap açıp bu hesabı bir ücret karşılığında suçlulara devreder. Bu durumda belge gerçektir, yüz gerçektir, kişi canlıdır ve hesap gerçekten onundur. Hiçbir kimlik doğrulama yöntemi, kişinin hesabını açtıktan sonra ne yapacağını bilemez. Bir diğer durum, kişinin kendisinin kandırılmasıdır: Bir dolandırıcı kendini banka görevlisi olarak tanıtıp kişiden "kimliğinizi doğrulamamız gerekiyor" diyerek bir doğrulama akışını tamamlamasını isteyebilir. Kişi kendi yüzüyle, kendi belgesiyle, canlı olarak doğrulamayı tamamlar; ama hesabı açan kişi o değildir.

Bu iki durumu anmak, yazının geri kalanındaki iddiaları doğru ölçekte tutmak için önemli. Kriptografik belgeler, Bölüm 7’de göreceğimiz gibi, sahte görüntü sorununu büyük ölçüde çözer. Ama kişinin kandırılmasını ya da kendi kimliğini bilerek kullandırmasını çözmez.

#tablo([#{strong[Tablo 1.]} Uzaktan kimlik doğrulamaya yönelik başlıca saldırı türleri.], (21fr, 23fr, 14fr, 44fr), ([Saldırı], [Neyi hedef alır], [Görüntü fiziksel ortamdan geçer mi?], [Başlıca savunma],), (
  ([Sunum saldırısı (Tip 1)], [kameranın önündeki yüz], [evet], [canlılık tespiti (ISO\/IEC 30107)],),
  ([Enjeksiyon saldırısı (Tip 2)], [kameradan sunucuya giden görüntü akışı], [hayır], [enjeksiyon tespiti (CEN\/TS 18099), cihaz ve uygulama bütünlüğü],),
  ([Sahte belge görüntüsü], [belge kontrolleri], [çoğu zaman hayır], [belge çipinin okunması ve imzasının doğrulanması],),
  ([Harmanlanmış portre], [belgenin verilme aşaması], [evet (başvuruda)], [belge verilirken canlı fotoğraf alma, harmanlama tespiti],),
  ([Çalıntı gerçek belge], [kişi ile belge arasındaki bağ], [evet], [yüz karşılaştırma ve canlılık],),
  ([Para katırı, kandırılan kişi], [kişinin niyeti], [evet], [işlem izleme, kullanıcı eğitimi; kimlik doğrulama tek başına yetmez],),
))

#kutu("onemli", [Bu bölümden akılda kalması gereken])[
Deepfake bir saldırı türü değil, bütün saldırı türlerini güçlendiren bir üretim tekniğidir. En tehlikeli birleşim, deepfake bir yüz akışının #{strong[kameranın arkasından]} enjekte edilmesidir; çünkü bu durumda görüntü hiçbir fiziksel ortamdan geçmez ve yalnızca görüntüye bakan bir savunmanın yakalayacağı iz çok azalır.
]

= Canlılık Tespiti ve Standartları

== Aktif ve pasif canlılık

Canlılık tespitinin iki ana yaklaşımı vardır. #{strong[Aktif]} canlılıkta sistem kullanıcıdan bir şey yapmasını ister: başını çevirmesini, gözünü kırpmasını, gülümsemesini, ekranda beliren bir noktayı gözüyle takip etmesini ya da yüksek sesle rastgele bir sayı okumasını. Mantık şudur: Önceden kaydedilmiş bir video, o anda rastgele seçilen bir komutu yerine getiremez. Bu mantık, kaydedilmiş videolara karşı iyi çalışır; ama gerçek zamanlı yeniden canlandırma yapabilen bir deepfake, komutu duyup yerine getirebilir.

#{strong[Pasif]} canlılıkta kullanıcıdan özel bir hareket istenmez. Sistem tek bir fotoğraf ya da kısa bir video üzerinden, görüntüdeki ince işaretleri inceler: cildin dokusu ve ışığı nasıl yansıttığı, yüzün üç boyutlu yapısının gölgelere yansıması, ekran piksellerinin ya da kâğıt baskısının izleri, kalp atışıyla deride oluşan çok küçük renk değişimleri. Bazı sistemler ekranın rengini hızla değiştirerek yüzü farklı ışıklarla aydınlatır ve yansımanın gerçek bir yüzle tutarlı olup olmadığına bakar. Pasif yöntemler kullanıcı için daha rahattır; ama sistemin neye baktığı dışarıdan daha az anlaşılır.

Bir de #{strong[donanım tabanlı]} yaklaşım vardır. Bazı telefonların yüz tanıma için kullandığı derinlik algılayıcıları ya da kızılötesi kameralar, yüzün gerçekten üç boyutlu olup olmadığını doğrudan ölçebilir. Ama uzaktan kimlik doğrulama uygulamaları, her telefonda bulunan sıradan ön kamerayla çalışmak zorunda olduğundan, çoğunlukla bu donanıma güvenemez.

== ISO\/IEC 30107: Canlılığı ölçmenin ortak dili

Bir canlılık tespiti yönteminin "iyi" olup olmadığını nasıl anlarız? Her üretici kendi ürününü kendi yöntemleriyle test edip "yüzde 99 başarılı" dediğinde bu rakamların karşılaştırılması imkânsızdır. Bu sorunu çözmek için ISO ile IEC’nin ortak biyometri alt komitesi (JTC 1\/SC 37), #{strong[ISO\/IEC 30107]} adlı bir standart serisi geliştirdi. Serinin bugünkü parçaları şunlar:

- #{strong[Bölüm 1, Çerçeve]} (2023’te güncellenmiş ikinci baskı): Sunum saldırısı, saldırı aracı, canlılık tespiti gibi temel terimleri tanımlar \[6\].
- #{strong[Bölüm 2, Veri biçimleri]}: Canlılık tespiti sonuçlarının biyometrik veri değişim biçimlerinde nasıl taşınacağını tanımlar.
- #{strong[Bölüm 3, Test ve raporlama]} (2023, ikinci baskı): Canlılık tespitinin nasıl test edileceğini, hangi ölçütlerle raporlanacağını ve bilinen saldırı türlerinin sınıflandırılmasını tanımlar \[7\].
- #{strong[Bölüm 4, Mobil cihazlar için test profili]} (2024, ikinci baskı): Üçüncü bölümün gerekliliklerini mobil cihazlara uyarlar \[8\].

Standart, belirli bir canlılık tespiti tekniğini #{strong[zorunlu kılmaz]} ve hangi tekniğin daha iyi olduğunu söylemez. Yaptığı iş, herkesin aynı dili konuşmasını sağlamaktır: Ne test edildi, nasıl test edildi, hangi saldırı araçlarıyla, hangi hata oranlarıyla? Ayrıca dikkat edilmesi gereken bir kapsam sınırı var: ISO\/IEC 30107-3 yalnızca #{strong[yakalama cihazında]}, yani kameranın önünde gerçekleşen saldırıları ele alır \[7\]. Bölüm 4.2’deki enjeksiyon saldırıları bu standardın kapsamı dışındadır.

#kutu("teknik", [APCER ve BPCER: Canlılık tespitinin iki hata oranı])[
ISO\/IEC 30107-3, canlılık tespiti için iki temel hata oranı tanımlar \[7\]:

- #{strong[APCER]} (#{emph[attack presentation classification error rate]}): Saldırı sunumlarından kaçının yanlışlıkla gerçek (#{emph[bona fide]}) sayıldığının oranı. Sistemin kaçırdığı saldırılar.
- #{strong[BPCER]} (#{emph[bona fide presentation classification error rate]}): Gerçek kullanıcıların sunumlarından kaçının yanlışlıkla saldırı sayıldığının oranı. Sistemin haksız yere reddettiği gerçek kişiler.

Küçük bir örnek (değerler örnektir): Bir laboratuvar, bir canlılık tespiti sistemine üç tür saldırı aracıyla (basılı fotoğraf, ekrandan video, silikon maske) her birinden 200 deneme yapıyor. Sistem fotoğrafların 2’sini, videoların 6’sını, maskelerin 18’ini gerçek sanıyor. Her saldırı aracı türü için APCER, gerçek sanılan denemelerin o türdeki bütün denemelere oranıdır:

#formul[$ "APCER"_"fotoğraf" &= 2 / 200 = "%1" \
"APCER"_"video" &= 6 / 200 = "%3" \
"APCER"_"maske" &= 18 / 200 = "%9" $]

Standart, raporlamada her tür için ayrı oran verilmesini ve sistemin bütünü için #{strong[en kötü türün]} oranının öne çıkarılmasını ister; çünkü saldırgan ortalamayla ilgilenmez, en işe yarayan aracı seçer:

#formul[$ "raporlanan APCER" &= max("%1", "%3", "%9") = "%9" \
"ortalama (raporlanmaz)" &= ("%1" + "%3" + "%9") / 3 approx "%4,3" $]

Aynı laboratuvar 1.000 gerçek kullanıcıyla da test yapıyor ve sistem bunların 30’unu saldırı sanıp reddediyor. BPCER, haksız yere reddedilen gerçek sunumların bütün gerçek sunumlara oranıdır:

#formul[$ "BPCER" = 30 / 1000 = "%3" $]

Her canlılık tespiti sistemi bir puan üretir ve bir eşikle karar verir; eşik sıkılaştırıldıkça APCER düşer, BPCER artar (Şekil 3). Bir banka için yüzde 3’lük BPCER, her yüz gerçek müşteriden üçünün hesap açarken takılması demektir. Bu yüzden canlılık tespiti hiçbir zaman "her saldırıyı yakala" diye ayarlanamaz; her zaman güvenlik ile kullanılabilirlik arasında bir denge noktası seçilir.
]

#sekil(3, [Canlılık tespitinde eşik ödünleşimi: APCER ve BPCER], "figures/a14/sekil-3.svg", yarim: false)

== Bağımsız bir ölçüm: NIST’in 2023 değerlendirmesi

Standart bir ölçüm dili olması, bağımsız kurumların farklı yöntemleri aynı koşullarda sınamasını mümkün kılar. Bunun en kapsamlı örneklerinden biri, NIST’in 2023’te yayımladığı ve yalnızca yazılımla, yalnızca görüntüye bakarak çalışan pasif canlılık tespiti algoritmalarını değerlendiren raporudur \[9\]. Değerlendirmeye 45 farklı geliştiriciden 82 algoritma katıldı. Veri kümesi yaklaşık 20.000 saldırı sunumu ve 21.000 gerçek sunumdan oluşuyordu; dokuz farklı saldırı aracı türü kullanılmıştı.

Raporun bulguları, bu yazının konusu için öğreticidir. Birincisi, başarı algoritmalar arasında ve saldırı türleri arasında çok büyük farklılık gösteriyordu. Basılı fotoğraf, ekrandan tekrar oynatma ve bazı maske türleri birden çok geliştirici tarafından iyi tespit edilirken, bazı saldırı türleri #{strong[test edilen bütün algoritmalarda]} yüksek hata oranlarına yol açtı. İkincisi, algoritmaların çoğu tek bir fotoğraf yerine kısa bir video verildiğinde daha düşük hata yaptı. Üçüncüsü, birden fazla algoritmanın puanları basitçe toplandığında, ortaya çıkan birleşik sistem, kimliğe bürünme amaçlı saldırıların bütün kategorilerinde tek başına en iyi algoritmadan daha iyi sonuç verdi.

Raporun belki de en önemli cümlesi bir kapsam notudur: Değerlendirme, görüntü yakalandıktan sonra yazılımın işleyişine müdahale eden saldırılar, #{strong[örneğin enjeksiyon saldırıları]}, hakkında hiçbir şey söylemiyor \[9\]. Yani en iyi pasif canlılık tespiti algoritması bile, sisteme kameradan değil de doğrudan yazılımdan verilen bir görüntüyü değerlendirirken, yalnızca o görüntünün içeriğine bakabilir.

== Enjeksiyon saldırılarına karşı yeni standartlar

Enjeksiyon saldırılarının ISO\/IEC 30107’nin kapsamı dışında kalması, standartlarda bir boşluk yarattı. Avrupa Standardizasyon Komitesi (CEN), bu boşluğu doldurmak için 2024’te #{strong[CEN\/TS 18099]} adlı bir teknik şartname yayımladı \[10\]. Şartname biyometrik veri enjeksiyon saldırılarını tanımlar, bu saldırıların biyometrik sistemlerin kayıt ve doğrulama donanımlarındaki kullanım senaryolarını sınıflandırır ve #{strong[enjeksiyon saldırısı tespiti]} (#{emph[injection attack detection]}, IAD) sistemlerinin nasıl değerlendirileceğine dair test planları için yol gösterir. Kapsamı da açıkça sınırlıdır: Sunum saldırısı testi şartnamenin dışındadır, çünkü o iş ISO\/IEC 30107’ye aittir. Teknik şartname statüsündeki bu belgenin geçerliliği başlangıçta üç yılla sınırlıdır; uluslararası karşılığı ise ISO\/IEC 25456 numarasıyla ISO ve IEC’nin ortak çalışma grubunda geliştirilme aşamasındadır.

Enjeksiyon tespiti, canlılık tespitinden farklı bir mantıkla çalışır. Görüntünün içeriğinden çok, görüntünün #{strong[geldiği yolu]} sorgular: kamera sürücüsünün ve donanımın kimliği, uygulamanın bütünlüğü, işletim sisteminin değiştirilip değiştirilmediği, görüntü akışının zamanlaması ve tutarlılığı. Bu sinyallerin bir kısmı, telefonların güvenli donanımında üretilen ve dizinin onuncu yazısında anlattığımız cihaz doğrulama beyanlarına dayanır.

== Avrupa’da kuralın kendisi: ETSI TS 119 461 ve 2025\/1566 sayılı uygulama tüzüğü

Avrupa Birliği’nde uzaktan kimlik kanıtlama için en ayrıntılı ölçüt, Avrupa Telekomünikasyon Standartları Enstitüsü’nün (ETSI) #{strong[TS 119 461]} numaralı teknik şartnamesidir \[11\]. Şartname, bir güven hizmetinin parçası olarak yapılan kimlik kanıtlamanın politika ve güvenlik gerekliliklerini tanımlar. Kimlik kanıtlamanın hangi kanıt türleriyle yapılabileceğini sayar: kimlik belgeleri, elektronik kimlik araçları, güvenilir kayıtlar, dijital imzalar, biyometrik yüz karşılaştırma ve diğer destekleyici kanıtlar. Uzaktan yapılan doğrulamanın, kişinin fiziksel olarak hazır bulunduğu bir doğrulamaya #{strong[eşdeğer güvence]} sağlamasını ister. Şartnamenin bugünkü sürümü, Şubat 2025’te yayımlanan 2.1.1 sürümüdür.

Bu şartnamenin önemi, eIDAS 2.0 ile birlikte hukuki bir bağlayıcılık kazanmasıdır. Avrupa Komisyonu, 29 Temmuz 2025’te kabul ettiği #{strong[2025\/1566 sayılı Uygulama Tüzüğü]} ile, nitelikli güven hizmeti sağlayıcılarının nitelikli sertifika ya da nitelikli öznitelik onayı verirken kişinin kimliğini ve özniteliklerini doğrulamasında başvurulacak standart olarak ETSI TS 119 461’in 2.1.1 sürümünü, bazı uyarlamalarla birlikte belirledi \[12\]. Tüzük, sağlayıcıların ve denetçilerin hazırlanması için yirmi dört aylık bir geçiş süresi öngörür ve #{strong[19 Ağustos 2027’den itibaren]} uygulanır.

Bu düzenlemenin bu yazı açısından anlamı şudur: Avrupa’da en yüksek güvence gerektiren kimlik kanıtlama işlemleri için, canlılık tespitinin ve belge doğrulamanın "yeterince iyi" olup olmadığı artık her sağlayıcının kendi takdirine bırakılmıyor; ortak bir standarda göre bağımsız denetçilerce değerlendirilecek.

== Türkiye’de durum

Türkiye’de bankaların uzaktan müşteri edinimi, 1 Nisan 2021’de Resmî Gazete’de yayımlanıp 1 Mayıs 2021’de yürürlüğe giren yönetmelikle mümkün hâle geldi \[18\]. Yönetmelik, uzaktan kimlik tespitini bir müşteri temsilcisiyle yapılan görüntülü görüşmeye dayandırır ve bu görüşmede belgenin doğruluğunu ve kişinin canlılığını tespit edici yöntemlerin kullanılmasını ister. Bu yazının konusu açısından en dikkat çekici hükmü ise biyometrik karşılaştırmanın neyle yapılacağına ilişkindir: Kişinin yüzü, kimlik belgesindeki #{strong[temassız yongadaki]} fotoğrafla, eğer yonga yakın alan iletişimi ile okunabiliyorsa; okunamıyorsa belgenin üzerindeki fotoğrafla karşılaştırılır \[18\]. Yani düzenleme, çipteki fotoğrafı belgenin üzerindeki basılı fotoğrafa tercih eder. Ödeme ve elektronik para kuruluşları için Eylül 2026’da yapılan bir düzenleme değişikliği de belge doğrulamada yakın alan iletişimini öncelikli yöntem olarak öne çıkardı ve yabancılar için ICAO 9303’e uygun, çipli pasaportların kullanımını tanımladı \[19\].

Bu yaklaşım, bir sonraki bölümün konusuna doğrudan bağlanıyor: Çipten okunan fotoğraf neden basılı fotoğraftan daha güvenilirdir?

#kutu("ornek", [Dilnoza’nın bankası ne görüyor?])[
Dilnoza hesabını açarken uygulama ona görüntülü görüşmeden önce bir adım daha yaptırdı: "Pasaportunuzu telefonunuzun arkasına yaklaştırın." Dilnoza o an bunun ne işe yaradığını düşünmedi; ekranda bir ilerleme çubuğu doldu ve görüşme başladı. Oysa o birkaç saniyede telefon, pasaportun kapağının içindeki çipten Dilnoza’nın fotoğrafını ve bilgilerini, Özbekistan’ın dijital imzasıyla birlikte okumuştu. Görüntülü görüşmede Dilnoza’nın yüzü, pasaportun sayfasındaki basılı fotoğrafla karşılaştırılmadı; karşılaştırma bu imzalı fotoğrafla yapıldı. Saldırganın ürettiği pasaport görüntüsünün ise kapağında bir çip yoktu.
]

= Çipli Kimlik Okuma: NFC ve ICAO 9303

== Pasaportun içindeki bilgisayar

Bugün dünyadaki pasaportların büyük çoğunluğunun kapağında ya da bir sayfasında, gözle görünmeyen küçük bir bilgisayar vardır: bir #{strong[temassız yonga]} (#{emph[contactless chip]}) ve onu besleyen ve onunla iletişim kuran bir anten. Bu tür pasaportlara #{strong[e-pasaport]} ya da #{strong[biyometrik pasaport]} denir; kapaklarındaki küçük, dikdörtgen içinde daire biçimli simgeden tanınırlar. Aynı teknoloji giderek kimlik kartlarına da yayılıyor. Avrupa Birliği’nde 2019\/1157 sayılı tüzük, 2 Ağustos 2021’den itibaren verilen bütün ulusal kimlik kartlarının, sahibinin yüz görüntüsünü ve iki parmak izini taşıyan yüksek güvenlikli bir depolama ortamı içermesini ve ICAO’nun belge standardına uygun olmasını zorunlu kıldı \[15\]. Aynı tüzük, ICAO’nun asgari güvenlik standartlarını karşılamayan ya da makinece okunabilir bölgesi bulunmayan eski kartların en geç 3 Ağustos 2026’da, yeni şartlara uymayan diğer kartların ise en geç 3 Ağustos 2031’de geçerliliğini yitirmesini öngördü.

Bu belgelerin hepsinin dayandığı ortak kural kitabı, Uluslararası Sivil Havacılık Örgütü’nün (ICAO) #{strong[Doc 9303]} numaralı belgesidir: #{emph[Makinece Okunabilir Seyahat Belgeleri]} \[14\]. Doc 9303, belgenin basılı yüzünden (fotoğrafın yeri, MRZ’nin biçimi) çipin içindeki veri yapısına ve güvenlik mekanizmalarına kadar her şeyi tanımlar. Bugünkü sürümü 2021’de yayımlanan sekizinci baskıdır. Bu yazı açısından en önemli üç bölümü şunlardır: çipteki verinin düzenini tanımlayan #{strong[Bölüm 10]}, güvenlik mekanizmalarını tanımlayan #{strong[Bölüm 11]} ve bu mekanizmaların dayandığı açık anahtar altyapısını tanımlayan #{strong[Bölüm 12]}.

Çip, telefonlarda da bulunan #{strong[yakın alan iletişimi]} (#{emph[near field communication]}, NFC) teknolojisiyle okunur. NFC, birkaç santimetrelik mesafede çalışan bir radyo iletişimidir; telefonun anteni hem çipe enerji verir hem de onunla veri alışverişi yapar. Dilnoza’nın pasaportunu telefonun arkasına yaklaştırması bu yüzdendir.

== Çipte ne var?

Doc 9303, çipteki bilgileri #{strong[veri grupları]} (#{emph[data groups]}, DG) adı verilen numaralı dosyalar hâlinde düzenler. Bunlara #{strong[mantıksal veri yapısı]} (#{emph[logical data structure]}, LDS) denir. Bu yazı için önemli olanlar şunlardır:

#tablo([#{strong[Tablo 2.]} Bir e-pasaport çipindeki başlıca veri grupları (ICAO Doc 9303, Bölüm 10).], (9fr, 45fr, 31fr), ([Çipteki dosya], [İçerik], [Not],), (
  ([DG1], [MRZ’deki bilgiler: ad, soyad, belge numarası, uyruk, doğum tarihi, cinsiyet, geçerlilik tarihi], [zorunlu],),
  ([DG2], [sahibinin yüz görüntüsü], [zorunlu; uzaktan doğrulamada yüz karşılaştırmanın dayanağı],),
  ([DG3], [parmak izleri], [isteğe bağlı; genellikle ek erişim denetimiyle korunur, yalnızca yetkili makamlar okuyabilir],),
  ([DG14], [çip doğrulama gibi ek güvenlik mekanizmalarının açık anahtarları], [isteğe bağlı],),
  ([DG15], [aktif doğrulama açık anahtarı], [isteğe bağlı],),
  ([EF.SOD], [#{strong[belge güvenlik nesnesi]}: bütün veri gruplarının özetleri ve belgeyi verenin dijital imzası], [zorunlu; pasif doğrulamanın dayanağı],),
))

Bu tablodaki son satır, bu bölümün kalbidir. Çipteki fotoğrafı, bir web sitesine yüklenen bir pasaport görüntüsündeki fotoğraftan ayıran şey, onun yanında bir #{strong[imza]} bulunmasıdır.

== Çipe erişim: BAC ve PACE

Çip bir radyo dalgasıyla okunduğuna göre, akla ilk gelen soru şudur: Biri, cebimdeki pasaportu benim haberim olmadan okuyabilir mi? Doc 9303 bunu engellemek için çipe erişimi bir parolaya bağlar. Bu parola gizli bir sır değildir; #{strong[belgenin üzerine basılı bir bilgidir]}. Çipi okumak isteyen kişi, belgenin kendisini görebilmeli, yani belge fiziksel olarak elinde olmalıdır.

İlk kuşak e-pasaportlarda kullanılan yönteme #{strong[temel erişim denetimi]} (#{emph[basic access control]}, BAC) denir. Parola, MRZ’deki belge numarasından, doğum tarihinden ve geçerlilik tarihinden türetilir. Yeni belgelerde ise daha güçlü bir yöntem olan #{strong[parolayla doğrulanmış bağlantı kurulumu]} (#{emph[password authenticated connection establishment]}, PACE) kullanılır. PACE’te parola yine MRZ’den türetilebilir ya da kimlik kartlarının ön yüzüne basılı altı haneli #{strong[kart erişim numarası]} (#{emph[card access number]}, CAN) olabilir. Uzaktan kimlik doğrulama uygulamaları bu yüzden çipi okumadan önce kullanıcıdan ya MRZ’nin fotoğrafını çekmesini ya da kartın üzerindeki numarayı girmesini ister.

#kutu("teknik", [Bir parola, belgenin üzerinden nasıl türetilir?])[
BAC’de çip ile okuyucu, belgenin MRZ’sindeki üç alanı birleştirerek ortak bir sır üretir \[14\]. Bu alanların her birinin yanında bir #{strong[sağlama hanesi]} durur. Sağlama hanesi, alanın yanlış okunup okunmadığını yakalamak için hesaplanan tek bir rakamdır. Hesapta her karakter bir sayıya çevrilir (rakamlar kendi değeri, A = 10, B = 11, …, Z = 35, #{raw("<")} = 0); sayılar soldan sağa sırayla 7, 3, 1, 7, 3, 1, … ağırlıklarıyla çarpılır, toplanır ve toplamın 10’a bölümünden kalan alınır:

#formul[$ c = (sum_i w_i dot d_i) mod 10, quad w = (7, 3, 1, 7, 3, 1, dots) $]

Örnek bir pasaportun belge numarası #{raw("FA1234567")} olsun (değerler örnektir). F = 15, A = 10 olduğundan:

#formul[$ c &= 15 dot 7 + 10 dot 3 + 1 dot 1 + 2 dot 7 + 3 dot 3 + 4 dot 1 + 5 dot 7 + 6 dot 3 + 7 dot 1 \
  &= 105 + 30 + 1 + 14 + 9 + 4 + 35 + 18 + 7 \
  &= 223 equiv 3 quad (mod 10) $]

Aynı hesap doğum tarihi #{raw("990315")} (YYAAGG) için 9, geçerlilik tarihi #{raw("320914")} için 7 verir. Üç alan sağlama haneleriyle birlikte yan yana yazılır; ortaya çıkan diziye #{strong[MRZ bilgisi]} denir. Anahtarlar bu diziden türetilir:

#formul[$ "MRZ bilgisi" &= "FA12345673" ‖ "9903159" ‖ "3209147" \
K_"seed" &= "SHA-1"("MRZ bilgisi")_(1..16) \
K_"enc" &= "SHA-1"(K_"seed" ‖ "00000001")_(1..16) \
K_"mac" &= "SHA-1"(K_"seed" ‖ "00000002")_(1..16) $]

Burada $‖$ yan yana eklemeyi, $(1..16)$ alt simgesi özetin ilk 16 baytını almayı gösterir. $K_"enc"$ şifreleme, $K_"mac"$ bütünlük anahtarıdır. Okuyucu ve çip bu anahtarlarla karşılıklı bir sınama yapar ve oturum anahtarları üretir:

#adimlar((
  ("Okuyucu → Çip", [#{strong[Sınama iste.]} Okuyucu GET CHALLENGE komutunu gönderir.], []),
  ("Çip → Okuyucu", [#{strong[Çipin rastgele sayısı.]} Çip 8 baytlık bir rastgele sayı döner.], $"RND.IC"$),
  ("Okuyucu → Çip", [#{strong[Okuyucunun cevabı.]} Okuyucu kendi rastgele sayısını ve anahtar payını ekleyip şifreler.], $E(K_"enc", "RND.IFD" ‖ "RND.IC" ‖ "K.IFD")$),
  ("Çip → Okuyucu", [#{strong[Çipin cevabı.]} Çip, okuyucunun #{raw("RND.IC")}’yi doğru şifrelediğini görünce kendi payıyla cevap verir.], $E(K_"enc", "RND.IC" ‖ "RND.IFD" ‖ "K.IC")$),
  ("Okuyucu, Çip", [#{strong[Oturum anahtarı.]} İki pay birleştirilir; sonraki bütün iletişim bundan türetilen anahtarlarla şifrelenir.], $"K.IFD" xor "K.IC"$),
))

Her şifreli mesajın yanında bir de $K_"mac"$ ile hesaplanmış bütünlük kodu gider. MRZ bilgisini bilmeyen biri üçüncü adımdaki mesajı üretemez; çip de bu yüzden ona hiçbir veri vermez. BAC’in zayıflığı, parolanın #{strong[entropisinin düşük]} olmasıdır: Doğum tarihi ve geçerlilik tarihi tahmin edilebilir aralıklarda olduğundan, kaydedilmiş bir iletişimden parolayı deneme yanılmayla bulmak mümkündür.

PACE bu zayıflığı giderir. Çip, rastgele bir sayıyı paroladan türetilen bir anahtarla şifreleyip okuyucuya gönderir. Okuyucu bu sayıyı ancak doğru parolayı biliyorsa çözebilir. Ardından iki taraf, bu sayıyı da işin içine katarak #{strong[eliptik eğri Diffie-Hellman]} adı verilen bir anahtar anlaşması yapar ve oturum anahtarlarını bu anlaşmadan üretir. Aşağıda $pi$ parola (MRZ bilgisi ya da CAN), $G$ eğrinin bilinen üreteci, $s$ çipin seçtiği rastgele sayıdır. Doc 9303’teki "genel eşleme" (#{emph[generic mapping]}) yöntemiyle akış şöyledir \[14\]:

#adimlar((
  ("Okuyucu, Çip", [#{strong[Parola anahtarı.]} İki taraf da paroladan aynı anahtarı türetir.], $K_pi = "KDF"(pi)$),
  ("Çip → Okuyucu", [#{strong[Şifreli sayı.]} Çip rastgele $s$’yi bu anahtarla şifreleyip gönderir.], $z = E(K_pi, s)$),
  ("Okuyucu", [#{strong[Çözme.]} Doğru parolayı bilen okuyucu $s$’yi elde eder.], $s = D(K_pi, z)$),
  ("Okuyucu ↔ Çip", [#{strong[Eşleme.]} Geçici anahtarlarla ortak bir nokta $H$ kurulur; $s$ ile birlikte yeni bir üreteç olur.], $hat(G) = s dot G + H$),
  ("Okuyucu ↔ Çip", [#{strong[Anahtar anlaşması.]} Yeni üreteç üzerinde ikinci bir Diffie-Hellman yapılır.], $K = "SK"_"çip" dot "PK"_"okuyucu"$),
  ("Okuyucu ↔ Çip", [#{strong[Karşılıklı doğrulama.]} Her taraf, karşı tarafın açık anahtarı üzerinde bir bütünlük kodu gönderir.], $T = "MAC"(K_"mac", "PK"_"karşı taraf")$),
))

Bu yapının sonucu şudur: Kaydedilmiş bir PACE iletişimine bakarak parolayı çevrimdışı deneme yanılmayla bulmak mümkün değildir; her yanlış tahmin çiple canlı bir deneme gerektirir.

Erişim denetiminin amacı #{strong[gizliliktir]}: Belgenin bilgilerinin, belgeyi elinde tutmayan biri tarafından okunmasını engellemek. Belgenin #{strong[gerçek]} olup olmadığını kanıtlamak ise bir sonraki mekanizmanın, pasif doğrulamanın işidir.
]

== Pasif doğrulama: Devletin imzası

Pasaportu veren devlet, çipe bilgileri yazarken onları imzalar. Devlet bunu, veri gruplarının özetlerinden oluşan bir listeyi imzalayarak yapar. Önce her veri grubunun (DG1, DG2, …) özeti hesaplanır (dizinin ilk yazısında anlattığımız özet fonksiyonlarıyla). Sonra bu özetler bir listeye yazılır, liste devletin #{strong[belge imzalayıcı]} (#{emph[document signer]}, DS) anahtarıyla imzalanır ve sonuç EF.SOD dosyasına konur.

Telefon çipi okuduğunda aynı işlemi tersinden yapar. Çipten okuduğu her veri grubunun özetini kendisi yeniden hesaplar ve EF.SOD’daki listeyle karşılaştırır. Sonra listenin üzerindeki imzayı belge imzalayıcının açık anahtarıyla doğrular. Son olarak belge imzalayıcının sertifikasının, o ülkenin #{strong[ülke imzalama sertifika otoritesi]} (#{emph[country signing certificate authority]}, CSCA) tarafından verildiğini doğrular. Bu işlemin tamamına #{strong[pasif doğrulama]} (#{emph[passive authentication]}) denir \[14\] (Şekil 4).

#sekil(4, [Pasif doğrulama: Çipteki verinin devletin imzasına bağlanması], "figures/a14/sekil-4.svg", yarim: false)

#kutu("teknik", [Belge güvenlik nesnesinin içi])[
EF.SOD, ASN.1 adı verilen bir veri tanımlama dilinde yazılmış ve #{strong[CMS]} (#{emph[Cryptographic Message Syntax]}) imzalı veri yapısına konmuş bir nesnedir. Sadeleştirilmiş hâli şuna benzer (değerler örnektir):

#kod("text", "LDSSecurityObject ::= SEQUENCE {
  version              0
  hashAlgorithm        sha256
  dataGroupHashValues  SEQUENCE {
    { dataGroupNumber 1,  dataGroupHashValue 3a7f…e2 }
    { dataGroupNumber 2,  dataGroupHashValue c91e…4b }
    { dataGroupNumber 14, dataGroupHashValue 07bd…91 }
    { dataGroupNumber 15, dataGroupHashValue 5e22…0c }
  }
}
SignedData: imza algoritması ecdsa-with-SHA256,
            imzalayan = belge imzalayıcı (DS) sertifikası", baslik: "Örnek: EF.SOD'un sadeleştirilmiş ASN.1 yapısı")

Doğrulama adımları aşağıdaki gibidir. $"SOD"[i]$, #{raw("dataGroupHashValues")} içinde $i$ numaralı veri grubu için kayıtlı özettir:

#adimlar((
  ("Doğrulayan ← Çip", [#{strong[Okuma ve özet.]} Çipten DG1 ve DG2 okunur; her birinin SHA-256 özeti hesaplanır.], $h_i = "SHA-256"("DG"_i)$),
  ("Doğrulayan", [#{strong[Karşılaştırma.]} Bir tanesi bile farklıysa veri değiştirilmiştir.], $h_i attach(=, t: ?) "SOD"[i]$),
  ("Doğrulayan", [#{strong[SOD’un imzası.]} #{raw("SignedData")} içindeki imza, DS sertifikasındaki açık anahtarla doğrulanır.], $"Verify"("PK"_"DS", "SOD")$),
  ("Doğrulayan", [#{strong[DS sertifikası.]} İmzası ülkenin CSCA sertifikasıyla doğrulanır; ülkenin iptal listesinde olmadığı kontrol edilir.], $"Verify"("PK"_"CSCA", "DS") and "DS" in.not "iptal listesi"$),
))

Dördüncü adım, doğrulayanın o ülkenin CSCA sertifikasına #{strong[önceden]} sahip olmasını gerektirir. Bu, dizinin altıncı yazısında ele aldığımız güven listesi sorusunun pasaport dünyasındaki karşılığıdır.
]

Pasif doğrulamanın gücü, uzaktan kimlik doğrulamanın Bölüm 2.4’te anlattığımız gizli varsayımını ortadan kaldırmasıdır. Telefon, çipteki fotoğrafın gerçek olup olmadığını bir görüntüye bakarak tahmin etmez; fotoğrafın özetinin, belgeyi veren devletin imzaladığı listede yer aldığını #{strong[matematiksel olarak doğrular]}. Bir saldırgan çipteki fotoğrafı kendi fotoğrafıyla değiştirirse özet tutmaz. Listeyi de değiştirirse imza tutmaz. İmzayı yeniden üretmek için devletin belge imzalayıcı gizli anahtarına sahip olması gerekir. Bu, dizinin ilk yazısında dijital imza için söylediğimiz "taklit zorluğunun matematikle kurulması" fikrinin pasaporttaki uygulamasıdır.

== Güvenin kaynağı: ICAO PKD

Pasif doğrulamanın son adımı, belgeyi veren ülkenin CSCA sertifikasını bilmeyi gerektirir. Dünyada yaklaşık iki yüz ülke ve her birinin zaman içinde değişen sertifikaları var. Bir sınır kapısındaki okuyucu ya da bir bankanın uygulaması bu sertifikalara nereden ulaşacak?

ICAO bu iş için #{strong[Açık Anahtar Dizini]} (#{emph[Public Key Directory]}, PKD) adı verilen ortak bir hizmet işletir. Katılımcı ülkeler belge imzalayıcı sertifikalarını ve iptal listelerini bu dizine yükler; dizin bu bilgileri bütün katılımcılara dağıtır. Ülkelerin kendi CSCA sertifikalarını birbirleriyle paylaşmak için ayrıca ikili yollar da kullanılır. ICAO’nun yayımladığı katılımcı listesinde Kasım 2026 itibarıyla 111 katılımcı yer alıyor \[20\]. Bu rakam önemli bir şeyi gösteriyor: Çipli pasaport veren ülkelerin hepsi bu ortak dizine katılmış değil. Bir doğrulayanın, her ülkenin pasaportu için pasif doğrulama yapabilmesi, o ülkenin sertifikasına erişebilmesine bağlıdır. Bu, dizinin ilk yazısında "güvenin kaynağı" diye adlandırdığımız sorunun, devletlerin kendi aralarında bile tam çözülmemiş olduğunu hatırlatır.

== Kopyaya karşı: aktif doğrulama ve çip doğrulama

Pasif doğrulamanın bir sınırı var: Verinin değiştirilmediğini kanıtlar, ama verinin #{strong[bu çipten]} geldiğini kanıtlamaz. Bir saldırgan gerçek bir pasaportun çipini okuyup bütün verilerini, EF.SOD dahil, başka bir çipe ya da bir yazılıma birebir kopyalayabilir. Kopya, pasif doğrulamadan geçer; çünkü veri gerçektir ve imza gerçektir. Bu duruma #{strong[klonlama]} denir.

Klonlamaya karşı Doc 9303 iki mekanizma tanımlar. #{strong[Aktif doğrulamada]} (#{emph[active authentication]}) çipin içinde, dışarıdan hiçbir şekilde okunamayan bir gizli anahtar bulunur; bu anahtarın açık eşi DG15’te durur ve EF.SOD aracılığıyla devletin imzasına bağlıdır. Okuyucu çipe rastgele bir sayı gönderir, çip bu sayıyı gizli anahtarıyla imzalar, okuyucu imzayı DG15’teki açık anahtarla doğrular. Kopya çipte veriler vardır ama gizli anahtar yoktur; çünkü gizli anahtar çipten hiçbir zaman çıkmaz. Bu yüzden kopya, rastgele sayıyı doğru imzalayamaz. #{strong[Çip doğrulamada]} (#{emph[chip authentication]}) aynı fikir bir anahtar anlaşmasıyla uygulanır: Çip, DG14’teki açık anahtarın gizli eşine sahip olduğunu, okuyucuyla yeni ve güçlü oturum anahtarları üreterek kanıtlar.

#kutu("teknik", [Sınama ve cevap: Bir çip kendini nasıl kanıtlar?])[
Aktif doğrulamanın akışı aşağıdadır (değerler örnektir). $r$ okuyucunun sınaması, $"SK"_"AA"$ çipin içindeki gizli anahtar, $"PK"_"AA"$ onun DG15’teki açık eşidir:

#adimlar((
  ("Okuyucu → Çip", [#{strong[Sınama.]} INTERNAL AUTHENTICATE komutuyla 8 rastgele bayt gönderilir (örnek: #{raw("4f1a9c02d77e3b10")}).], $r in {0, 1}^64$),
  ("Çip → Okuyucu", [#{strong[İmza.]} Çip sınamayı gizli anahtarıyla imzalar.], $sigma = "Sign"("SK"_"AA", r)$),
  ("Okuyucu", [#{strong[İmza kontrolü.]} İmza DG15’teki açık anahtarla doğrulanır.], $"Verify"("PK"_"AA", r, sigma)$),
  ("Okuyucu", [#{strong[Anahtarın kaynağı.]} DG15’in özeti EF.SOD’da, EF.SOD da devletin imzasıyla korunuyor (pasif doğrulama).], $H("DG"_15) = "SOD"[15]$),
))

Dört adım da geçerse okuyucu şu sonuca varır: "Bu çip, devletin bu belge için ürettiği çipin ta kendisi." Kopya çip ikinci adımda takılır; $r$ her seferinde yeni olduğu için eski bir cevabı tekrar oynatmak da işe yaramaz.

Bu yapının dizinin geri kalanıyla bağı şudur: Burada çip, belgenin sahibine değil, #{strong[belgenin fiziksel taşıyıcısına]} bağlı bir anahtar kullanır. Dizinin ikinci yazısında anlattığımız #{strong[sahip bağlama]} (#{emph[holder binding]}) kavramının fiziksel karşılığıdır: Belge, kopyalanamayan bir anahtara bağlanır ve o anahtarın varlığı her gösterimde yeniden kanıtlanır. Bölüm 7’de aynı fikrin, çip yerine telefonun güvenli donanımındaki bir anahtarla nasıl kurulduğunu göreceğiz.
]

== Telefonla çip okuma: uçtan uca akış

Artık uzaktan kimlik doğrulama uygulamasının çipi okurken yaptığı işi baştan sona izleyebiliriz (Şekil 5).

#sekil(5, [Telefonla çipli belge okuma ve yüz karşılaştırma], "figures/a14/sekil-5.svg", yarim: false)

#kutu("teknik", [Akışın her adımında ne hesaplanır?])[
Şekil 5’teki yedi adımı, bu bölümün önceki kutularındaki hesaplarla birlikte tek tabloda toplayalım:

#adimlar((
  ("Uygulama", [#{strong[Parola.]} MRZ kamerayla okunur ya da kart erişim numarası girilir.], $pi = "MRZ bilgisi" "ya da" "CAN"$),
  ("Uygulama ↔ Çip", [#{strong[Şifreli oturum.]} PACE (eski belgelerde BAC) ile oturum anahtarları kurulur.], $K_"enc", K_"mac"$),
  ("Uygulama ← Çip", [#{strong[Okuma.]} DG1, DG2, DG14\/DG15 ve EF.SOD okunur.], $"DG"_1, "DG"_2, dots, "SOD"$),
  ("Uygulama ↔ Çip", [#{strong[Kopya kontrolü.]} Çip doğrulama ya da aktif doğrulama yapılır.], $sigma = "Sign"("SK"_"AA", r)$),
  ("Uygulama → Sunucu", [#{strong[Gönderim.]} Veri grupları, EF.SOD ve çipin cevabı sunucuya gider.], $("DG"_i, "SOD", r, sigma)$),
  ("Sunucu", [#{strong[Pasif doğrulama.]} Özetler, DS imzası, CSCA zinciri ve iptal listesi kontrol edilir.], $H("DG"_i) = "SOD"[i]$),
  ("Sunucu", [#{strong[Yüz karşılaştırma.]} DG2’deki imzalı portre, canlılık kontrolünden geçmiş selfie ile karşılaştırılır.], $cos theta >= "eşik"$),
))

Son sütundaki işlemlerin ilk altısı kesin matematik işlemleridir: Bir özet ya tutar ya tutmaz, bir imza ya geçerlidir ya değildir. Yalnızca yedinci adım bir eşikle, yani bir benzerlik tahminiyle karar verir.
]

İki noktanın altını çizmek gerekiyor. Birincisi, 6. adımdaki pasif doğrulama mümkünse #{strong[sunucuda]} yapılmalıdır; çünkü telefon saldırganın denetiminde olabilir. Telefonun "doğruladım" demesine güvenmek yerine, sunucu imzalı veriyi kendisi doğrular. İmzanın güzelliği de buradadır: İmzalı veri, saldırganın denetimindeki bir cihazdan geçse bile değiştirilemez. Bu, görüntü için söylenemez; bir görüntünün geçtiği cihaz onu istediği gibi değiştirebilir.

İkincisi, 7. adım hâlâ bir görüntüye dayanır. Çip okuma, #{strong[belgenin]} gerçek olduğunu kesin olarak kanıtlar. Ama "bu belgeyi şu anda telefonun önünde tutan kişi, belgenin sahibi mi?" sorusu yine yüz karşılaştırmaya ve canlılık tespitine kalır. Burada iki önemli kazanım var. Karşılaştırma artık devletin imzaladığı bir portreyle yapılır; saldırgan sahte bir belge görüntüsü üreterek kendi yüzünü belgeye koyamaz. Ve saldırgan çipi okumak için gerçek belgeyi fiziksel olarak elinde tutmak zorundadır. Ama selfie tarafındaki enjeksiyon riski ortadan kalkmaz; saldırgan gerçek belgeyi çalmışsa, belgenin sahibinin yüzünü enjekte etmeye çalışabilir.

#kutu("onemli", [Bu bölümden akılda kalması gereken])[
Çipli belge okuma, uzaktan kimlik doğrulamanın belge tarafını görüntü yorumundan imza doğrulamaya taşır. Pasif doğrulama verinin devletin imzaladığı veri olduğunu, çip ya da aktif doğrulama ise çipin kopya olmadığını kanıtlar. Ama kişinin belgenin sahibi olduğunu kanıtlama işi, karşılaştırma imzalı bir portreyle yapılsa da, hâlâ kameraya ve canlılık tespitine kalır.
]

= Kriptografik Belgeye Geçiş: Görüntüden İmzaya

== Üç kanıt düzeyi

Buraya kadar anlattıklarımızı, bir doğrulayanın elindeki kanıtın türüne göre üç düzeyde toplayabiliriz (Şekil 6).

#sekil(6, [Görüntüden imzaya: üç kanıt düzeyi], "figures/a14/sekil-6.svg", yarim: false)

İlk düzeyde, doğrulayan her şeyi bir görüntüden #{strong[tahmin eder]}. İkinci düzeyde, belgenin gerçekliği bir imzayla #{strong[kanıtlanır]}, ama kişinin belgenin sahibi olduğu hâlâ görüntüyle tahmin edilir. Üçüncü düzeyde ise iki soru da kanıta dayanır ve bu düzey, dizinin bütününde anlattığımız modelin, yani doğrulanabilir belgelerin ve kimlik cüzdanlarının ta kendisidir.

== PID: Kimlik bilgisinin baştan imzalı olması

Dizinin ilk yazısında, Avrupa Dijital Kimlik Cüzdanı’nın temelinde #{strong[kişi kimlik verisi]} (#{emph[person identification data]}, PID) olduğunu anlatmıştık: Devletin ya da devletin yetkilendirdiği bir kurumun verdiği, ad, soyad, doğum tarihi, uyruk gibi temel bilgileri taşıyan ve verenin dijital imzasıyla korunan bir kimlik bilgisi. eIDAS 2.0’a göre PID, #{strong[yüksek]} güvence düzeyinde verilmek zorundadır \[5, 16\].

PID’in görüntü tabanlı doğrulamadan farkını görmek için, onu pasaport çipiyle karşılaştıralım. İkisi de devletin imzasını taşır. İkisi de değiştirilemez. Ama aralarında iki büyük fark var.

Birincisi, PID bir doğrulayana gösterilirken #{strong[kişinin cihazındaki bir anahtara bağlıdır]}. Bu anahtar telefonun güvenli donanımında üretilir ve oradan hiç çıkmaz; tıpkı pasaport çipinin aktif doğrulama anahtarı gibi. Doğrulayan, PID’i her istediğinde cüzdandan bu anahtarla, o işleme özel bir imza da ister. Böylece doğrulayan iki şeyi birden kanıtlanmış olarak alır: belge gerçektir (verenin imzası) ve belge, şu anda onu gösteren cihazın anahtarına bağlıdır (sahip bağlama imzası). Dizinin ikinci yazısında anlattığımız bu mekanizma, pasaportta yalnızca çipin kopya olmadığını kanıtlarken, cüzdanda belgenin sahibinin cihazında olduğunu kanıtlar.

İkincisi, ve deepfake’ler açısından belki daha önemlisi: Cüzdandaki anahtarı kullanmak için kişinin #{strong[kendi telefonunda]}, telefonun yerel kilidini açması gerekir; bir PIN ya da telefonun kendi biyometrik doğrulaması. Bu biyometrik doğrulama telefonun içinde, telefonun güvenli donanımıyla yapılır. Yüz görüntüsü hiçbir sunucuya gönderilmez, hiçbir doğrulayan tarafından yorumlanmaz. Deepfake bir yüzün, bir uzak sunucuya gönderilen görüntü akışına enjekte edilmesiyle, telefonun kendi kamerası ve güvenli donanımı arasındaki bir doğrulamayı aşmak çok farklı zorluklardadır. Bu, dizinin onuncu yazısında ele aldığımız cüzdan güvenliğinin konusu.

#kutu("teknik", [Sahip bağlama imzasının içi])[
SD-JWT VC biçimindeki \[22\] bir PID gösterilirken, belgenin sonuna cüzdanın o işlem için ürettiği bir #{strong[anahtar bağlama belirteci]} (#{emph[key binding JWT]}, KB-JWT) eklenir. İçeriği şuna benzer (değerler örnektir):

#kod("json", "{
  \"typ\": \"kb+jwt\",
  \"alg\": \"ES256\"
}
.
{
  \"iat\": 1801728000,
  \"aud\": \"https://banka.example\",
  \"nonce\": \"r7Qx2mVb9KpL\",
  \"sd_hash\": \"Wb0nQ9…f3\"
}", baslik: "Örnek: KB-JWT'nin başlığı ve içeriği (nokta ile ayrılmış iki parça)")

- #{raw("aud")}: belirteç hangi doğrulayan için üretildi; başka bir doğrulayana gösterilirse reddedilir.
- #{raw("nonce")}: doğrulayanın o anda ürettiği tek kullanımlık değer. Bölüm 6.6’daki aktif doğrulamanın "rastgele sınama"sıyla aynı işi görür: kaydedilmiş eski bir gösterimin tekrar kullanılmasını engeller.
- #{raw("sd_hash")}: gösterilen belgenin ve açılan alanların özeti; belirteç bu gösterime bağlanır.

Belirteç, PID’in içinde verenin imzasıyla kayıtlı olan açık anahtarın gizli eşiyle imzalanır. Doğrulayan önce PID’in imzasını verenin güven listesindeki anahtarıyla, sonra KB-JWT’nin imzasını PID’in içindeki açık anahtarla doğrular. ISO\/IEC 18013-5 \[23\] biçimindeki (mdoc) belgelerde aynı işi #{strong[cihaz doğrulama]} (#{emph[device authentication]}) yapısı görür. İki durumda da doğrulayanın önünde yorumlanacak bir görüntü yoktur; yalnızca doğrulanacak iki imza vardır.
]

== Biyometri ortadan kalkmıyor, yer değiştiriyor

Görüntüden imzaya geçişin deepfake sorununu tamamen ortadan kaldırdığını söylemek yanlış olur. PID’in de bir gün, bir yerde, ilk kez verilmesi gerekir. Kişi cüzdanını kurduğunda, PID’i veren kurum onun gerçekten o kişi olduğundan emin olmak zorundadır. Bu ilk verilişte ne olur?

Avrupa’da bu soruya verilen cevaplar ülkeden ülkeye değişiyor, ama ortak eğilim belli: PID’in ilk verilişi, mümkün olduğunca #{strong[zaten var olan yüksek güvenceli bir araca]} dayandırılıyor. Çipli bir kimlik kartı telefona okutuluyor ve kartın kendi elektronik kimlik işlevi kullanılıyor; ya da ulusal bir elektronik kimlik sistemiyle giriş yapılıyor. Bunların ikisi de bu yazıda anlattığımız ikinci kanıt düzeyine, yani bir imzaya dayanır. Çipli belgesi olmayan ya da çipi okunamayan kişiler için yüz yüze başvuru ya da güçlendirilmiş uzaktan doğrulama yolları kalıyor.

Burada ölçek farkı önemli. Görüntü tabanlı uzaktan doğrulamada deepfake saldırısı, kişinin hayatı boyunca hesap açtığı, abone olduğu, başvurduğu #{strong[her]} yerde yeniden denenebilir. Her banka, her ödeme kuruluşu, her platform ayrı bir kapıdır ve her kapı ayrı bir canlılık tespiti algoritmasıyla korunur; saldırgan en zayıf kapıyı seçer. İmzalı kimlik bilgisinde ise biyometrik doğrulama #{strong[tek bir ana]}, PID’in verilişine çekilir. O an, en güçlü yöntemlerle (çip okuma, yüz yüze başvuru, denetlenmiş süreçler) korunabilir. Sonraki bütün gösterimler imzaya dayanır. Bir saldırı yüzeyini ortadan kaldıramasak da, onu binlerce kapıdan tek bir kapıya indirebiliriz.

== Hukuk da aynı yöne bakıyor

eIDAS 2.0, nitelikli güven hizmeti sağlayıcılarının nitelikli sertifika verirken kişinin kimliğini doğrulayabileceği yolları sayarken, ilk sıraya Avrupa Dijital Kimlik Cüzdanı’nı ve yüksek güvence düzeyindeki bildirilmiş elektronik kimlik araçlarını koyar \[16\]. Diğer yollar, yani fiziksel olarak hazır bulunma ya da bir uygunluk değerlendirme kuruluşunca onaylanmış başka yöntemler (görüntü tabanlı uzaktan doğrulama dahil) de mümkündür; ama bunlar için Bölüm 5.5’te anlattığımız ayrıntılı ve denetlenebilir gereklilikler devreye girer. Yani düzenleme, imzalı bir kimlik aracının var olduğu yerde onu tercih eden, olmadığı yerde görüntüye dayalı yöntemi sıkı kurallara bağlayan bir yapı kuruyor.

Türkiye’deki bankacılık düzenlemesinin çipteki fotoğrafı basılı fotoğrafa tercih etmesi de (Bölüm 5.6), aynı yönün daha erken bir adımı olarak okunabilir.

#kutu("ornek", [Dilnoza bir yıl sonra])[
Özbekistan’ın da Avrupa’nınkiyle uyumlu bir cüzdan altyapısına geçtiğini ve Dilnoza’nın PID’ini, kimlik kartını telefonuna okutarak cüzdanına aldığını düşünelim. Dilnoza bu kez bir sigorta şirketinde poliçe açmak istiyor. Şirketin uygulaması ondan ne pasaport fotoğrafı ne selfie istiyor. Ekranda bir QR kod çıkıyor; Dilnoza’nın cüzdanı "Bu şirket adınızı, doğum tarihinizi ve uyruğunuzu görmek istiyor" diyor. Dilnoza telefonunun kilidini yüzüyle açıyor ve onaylıyor. Şirket iki imzayı doğruluyor: Özbekistan’ın PID imzası ve Dilnoza’nın cihazındaki anahtarın imzası. Saldırgan Dilnoza’nın bütün fotoğraflarına ve videolarına sahip olsa da bu işlemi taklit edemez; çünkü ondan istenen şey, Dilnoza’nın telefonunda duran ve oradan hiç çıkmayan bir anahtarla atılmış bir imzadır.

Bir soru açıkta kalıyor: Sigorta şirketi, Özbekistan’ın PID imzalayan anahtarının gerçekten Özbekistan’a ait olduğunu nereden biliyor? Bu, pasaport dünyasındaki PKD sorusunun cüzdan dünyasındaki karşılığı. Bölüm 10’da bu soruya döneceğiz.
]

= Yöntemlerin Karşılaştırması

#tablo([#{strong[Tablo 3.]} Uzaktan kimlik doğrulama yöntemlerinin karşılaştırması.], (27fr, 20fr, 15fr, 27fr, 26fr), ([Ölçüt], [Görüntü tabanlı otomatik], [Görüntülü görüşme], [Çip okuma + yüz karşılaştırma], [Cüzdandaki imzalı PID],), (
  ([Belgenin gerçekliği nasıl anlaşılıyor?], [görüntü yorumu], [görevlinin gözü + görüntü yorumu], [devletin imzası (pasif doğrulama)], [verenin imzası],),
  ([Belgenin kopya olmadığı], [anlaşılamaz], [anlaşılamaz], [çip ya da aktif doğrulama], [cihazdaki anahtarla sahip bağlama],),
  ([Kişinin belgenin sahibi olduğu], [yüz karşılaştırma + canlılık], [görevli + canlılık], [imzalı portreyle yüz karşılaştırma + canlılık], [cihaz anahtarı + telefonun yerel kilidi],),
  ([Sahte belge görüntüsüne dayanıklılık], [düşük], [düşük – orta], [yüksek], [yüksek],),
  ([Enjeksiyona dayanıklılık], [canlılık ve enjeksiyon tespitine bağlı], [düşük – orta], [belge tarafında yüksek, yüz tarafında tespite bağlı], [yüksek (görüntü sunucuya gitmez)],),
  ([Biyometrik veri nereye gidiyor?], [doğrulayan ya da hizmet sağlayıcı], [doğrulayan], [doğrulayan], [yalnız telefonun içinde],),
  ([Kimler kullanabilir?], [kamerası olan herkes], [kamerası olan herkes], [çipli belgesi ve NFC’li telefonu olanlar], [cüzdanı ve PID’i olanlar],),
  ([Her doğrulamada tekrar edilir mi?], [evet], [evet], [evet], [biyometrik kanıtlama yalnız PID verilirken],),
))

Tablodan çıkan sonuç, yöntemlerden birinin diğerlerinin yerine hemen geçeceği değil. Görüntü tabanlı yöntemler, çipli belgesi ya da NFC’li telefonu olmayan milyonlarca insan için uzun yıllar gerekli olmaya devam edecek. Ama tablonun son iki sütunu, deepfake sorununa verilebilecek en güçlü cevabın daha iyi bir görüntü tespiti değil, #{strong[görüntüye daha az ihtiyaç duymak]} olduğunu gösteriyor.

= Sınırlar ve Açık Sorular

#{strong[Tespitin bitmeyen yarışı.]} Canlılık ve deepfake tespiti, saldırganın kullandığı araçlarla aynı teknolojiye, makine öğrenmesine dayanır. Bir tespit yöntemi ne kadar iyi olursa olsun, onu atlatmak için eğitilmiş bir sonraki üretici model her zaman mümkündür. NIST’in 2023 değerlendirmesinde bazı saldırı türlerinin bütün algoritmalarda yüksek hataya yol açması \[9\], bu yarışın bugünkü durumunu iyi özetliyor. Bu yüzden görüntü tabanlı doğrulamanın güvenliği, bir kez ölçülüp sertifikalandırılıp bir kenara bırakılamaz; sürekli yeniden ölçülmesi gerekir.

#{strong[Kapsayıcılık.]} Çipli belge okuma ve imzalı kimlik bilgisi güçlü yöntemler, ama herkesin bunlara erişimi yok. Dünyada hâlâ çipsiz kimlik belgeleri yaygın; NFC’si olmayan ya da kimlik kartının çipini okuyamayan telefonlar var; yaşlılar, engelliler ve dijital okuryazarlığı düşük kişiler için çip okuma adımı bir engel olabilir. Görüntü tabanlı yöntemleri tamamen kaldırmak, bu kişileri dijital hizmetlerin dışında bırakabilir. Doğru soru, hangi işlem için hangi kanıt düzeyinin yeterli olduğu ve daha güçlü kanıtı sunamayan kişiye hangi alternatif yolun açık tutulacağıdır.

#{strong[Biyometrik verinin kendisi.]} Görüntü tabanlı doğrulamada kişinin yüz görüntüsü, çoğu zaman bir hizmet sağlayıcının sunucusunda işlenir ve bir süre saklanır. Biyometrik veri, hem Avrupa’nın Genel Veri Koruma Tüzüğü’nde hem Türkiye’nin Kişisel Verilerin Korunması Kanunu’nda özel nitelikli kişisel veri olarak sıkı korumaya tabidir. Deepfake çağında bu verinin sızması, eskisinden daha ağır sonuçlar doğurabilir: Sızan yüz videoları, bir sonraki saldırının eğitim malzemesidir. İmzalı kimlik bilgisinin, biyometrik doğrulamayı telefonun içine çekmesi bu açıdan da bir kazanımdır.

#{strong[Yanlış ret ve demografik farklar.]} Yüz karşılaştırma ve canlılık tespiti algoritmaları herkes için aynı doğrulukta çalışmayabilir. NIST’in 2019’da yayımladığı kapsamlı bir değerlendirme, yüz tanıma algoritmalarının önemli bir kısmında hata oranlarının yaş, cinsiyet ve kökene göre farklılaştığını gösterdi \[21\]. Canlılık tespitindeki BPCER’in de belirli gruplarda daha yüksek olması, bu kişilerin hesap açarken daha sık takılması anlamına gelir. Bu farkların ölçülmesi ve raporlanması, bir yöntemin benimsenmesinden önce sorulması gereken sorulardandır.

#{strong[Harmanlama ve belge verme süreci.]} Bölüm 4.3’te gördüğümüz gibi, harmanlanmış portre saldırısı belgenin verildiği anı hedef alır. Bu durumda çip de imzalı ama sahte bir portre taşır. Bu, kriptografik belgenin sınırını gösteren önemli bir örnek: İmza, bir bilginin veren tarafından söylendiğini kanıtlar; #{strong[verenin doğru söylediğini]} kanıtlamaz. Bu yüzden belge verme süreçlerinin kendisi (portrenin başvuru sırasında canlı olarak alınması gibi) güvenlik zincirinin ayrılmaz bir parçasıdır.

#{strong[Yapay zekâ düzenlemelerinin etkisi.]} Avrupa Birliği’nin yapay zekâ tüzüğü, deepfake içerik üretenlere ve yayanlara, içeriğin yapay olarak üretildiğini açıklama yükümlülüğü getirir; bu yükümlülük 2 Ağustos 2026’dan itibaren uygulanmaktadır \[17\]. Bu kural kamusal bilgi ortamı için önemli bir adımdır. Ama kimlik doğrulama açısından sınırlı bir etkisi olacaktır; çünkü bir dolandırıcılık girişiminde deepfake kullanan kişi, zaten yasaları çiğnemektedir ve etiketleme yükümlülüğüne uymayacaktır. Kimlik doğrulama sistemleri, saldırganın kurallara uyacağını varsayarak tasarlanamaz.

#{strong[Hesap kurtarma.]} Kriptografik yöntemler, ilk doğrulamayı güçlendirir; ama kişi telefonunu kaybettiğinde ya da cüzdanını yeni bir cihaza taşımak istediğinde ne olacak? Kurtarma süreci zayıfsa, saldırgan doğrudan kurtarmayı hedef alır. Birçok sistemde hesap kurtarma hâlâ bir selfie ve bir belge fotoğrafına dayanıyor. Yani zincirin en zayıf halkası "telefonumu kaybettim" düğmesi olabilir.

#{strong[Ülkeler arası güven.]} Pasif doğrulama ve PID imzası, doğrulayanın belgeyi veren devletin anahtarını bilmesine dayanır. ICAO PKD’nin bütün ülkeleri kapsamaması \[20\] ve AB’nin cüzdan altyapısının bugün yalnızca üye devletleri kapsaması, bu güvenin sınırlarını belirliyor. Taşkent’te verilmiş bir PID’i İstanbul’daki bir sigorta şirketinin doğrulayabilmesi, teknik bir sorundan önce bir güven altyapısı sorunudur.

= Bu Tablonun İçinde Tamga Network

Bu yazı dizisi, Türkiye ve Türk dünyası için kâr amacı gütmeyen bir dijital güven ağı olarak tasarlanan Tamga Network tarafından yayımlanıyor. Ağ, Avrupa Birliği’nin eIDAS 2.0 ve EUDI mimarisini, AB üyesi olmayan ülkeler için uygulanabilir kılmayı hedefler: Kurumlar kişinin cüzdanına imzalı belge verir, kişi yalnızca istenen alanları paylaşır, doğrulayan da belgeyi veren kuruma sormadan doğrular.

Bu yazının konusuyla bağı, Bölüm 7’de anlattığımız üçüncü kanıt düzeyidir. Ağın yaklaşımında görüntüye dayalı kimlik kanıtlama, belgenin ilk verildiği anla sınırlı kalmalı; sonrasında dolaşan şey, imzalı bir belge ve onu kişinin cihazına bağlayan bir anahtar olmalıdır. Ağın bu tabloya asıl katkısı ise Bölüm 9’un son maddesine, yani ülkeler arası güven sorusuna yöneliktir: Ağ, belge veren kurumların ve cüzdanların kim olduğunu söyleyen imzalı güven listelerini AB’nin güven listesi modeline uygun biçimde yayımlar. Listeler, Taşkent’te ya da Bakü’de imzalanmış bir belgenin anahtarının da bir gün aynı yoldan öğrenilebilmesi için her üye devlete yer ayıracak biçimde tasarlanmıştır; bugün etkin olan yalnızca Türkiye listesidir. Güven listelerinde hiçbir kişisel veri, hiçbir biyometrik veri yer almaz. Ağ kendisi bir cüzdan işletmez; cüzdanları, belge veren kurumları ve doğrulayanları listeler.

= Sonuç

Uzaktan kimlik doğrulama, şubeye gitmenin yerine kameranın önünde durmayı koydu. Bu, son on yılın en büyük kolaylıklarından biri oldu; milyonlarca insan bir banka hesabını, bir telefon hattını, bir sigorta poliçesini birkaç dakikada açabiliyor. Ama bu kolaylık, sessiz bir varsayıma dayanıyordu: Kameradan gelen görüntü, kameranın önündeki gerçekliğin kaydıdır. Deepfake’ler ve enjeksiyon saldırıları bu varsayımı aşındırıyor.

Bu aşınmaya karşı iki yol var ve ikisi birbirini dışlamıyor. Birinci yol, görüntünün gerçek olup olmadığını daha iyi anlamaya çalışmak: canlılık tespitini geliştirmek, enjeksiyon saldırılarını tespit etmek, bunları ISO\/IEC 30107 ve CEN\/TS 18099 gibi standartlarla ölçmek, ETSI TS 119 461 gibi şartnamelerle denetlemek. Bu yol gerekli ve görüntü tabanlı yöntemlere ihtiyaç duyacak insanlar olduğu sürece sürecek. Ama doğası gereği bitmeyen bir yarış.

İkinci yol, yarışın dışına çıkmak: görüntünün yerine imzaya güvenmek. Pasaportlardaki çip, yirmi yılı aşkın bir süredir bunun mümkün olduğunu gösteriyor; telefonla okunan bir çip, belgenin gerçek olduğunu devletin imzasıyla kanıtlıyor. İmzalı kimlik bilgisi ve kimlik cüzdanları bu fikri sonuna kadar götürüyor: Belge gerçekliği verenin imzasıyla, sahiplik ise kişinin cihazındaki bir anahtarla kanıtlanıyor; biyometrik doğrulama, kişinin kendi telefonunun içine ve belgenin ilk verildiği tek bir ana çekiliyor.

Dizinin ilk yazısında, dijital dünyada taklit zorluğunun belgenin fiziksel yapısından gelemeyeceğini, matematikten gelmesi gerektiğini söylemiştik. Deepfake’ler bu cümlenin belgeler kadar yüzler için de geçerli olduğunu gösteriyor. Bir yüzün görüntüsü artık kimin önünde durduğumuzu kanıtlamaya yetmiyor. Bunu kanıtlayabilecek olan, o kişinin elinde tuttuğu ve kimsenin kopyalayamadığı bir anahtar ve o anahtarın kime ait olduğunu söyleyen, herkesin tanıdığı bir imza.

#heading(level: 1, numbering: none)[Kaynaklar]

#kaynak("1")[Goodfellow, I., Pouget-Abadie, J., Mirza, M., Xu, B., Warde-Farley, D., Ozair, S., Courville, A. ve Bengio, Y. (2014). "Generative Adversarial Nets." #{emph[Advances in Neural Information Processing Systems 27 (NeurIPS 2014)]}.]

#kaynak("2")[Chen, H. ve Magramo, K. (2024). "Finance worker pays out \$25 million after video call with deepfake ’chief financial officer’." #{emph[CNN]}, 4 Şubat 2024. (Hong Kong polisinin açıklamasına dayanır.)]

#kaynak("3")[Financial Crimes Enforcement Network (FinCEN) (2024). #{emph[FinCEN Alert on Fraud Schemes Involving Deepfake Media Targeting Financial Institutions.]} FIN-2024-Alert004, 13 Kasım 2024.]

#kaynak("4")[ENISA (2022). #{emph[Remote Identity Proofing: Attacks & Countermeasures.]} Avrupa Birliği Siber Güvenlik Ajansı, Ocak 2022.]

#kaynak("5")[Avrupa Komisyonu (2015). #{emph[Elektronik kimlik araçlarının güvence düzeylerine ilişkin teknik şartları ve prosedürleri belirleyen 2015\/1502 sayılı Uygulama Tüzüğü (AB).]}]

#kaynak("6")[ISO\/IEC (2023). #{emph[ISO\/IEC 30107-1:2023 Information technology — Biometric presentation attack detection — Part 1: Framework.]}]

#kaynak("7")[ISO\/IEC (2023). #{emph[ISO\/IEC 30107-3:2023 Information technology — Biometric presentation attack detection — Part 3: Testing and reporting.]} İkinci baskı.]

#kaynak("8")[ISO\/IEC (2024). #{emph[ISO\/IEC 30107-4:2024 Information technology — Biometric presentation attack detection — Part 4: Profile for testing of mobile devices.]} İkinci baskı.]

#kaynak("9")[Ngan, M., Grother, P. ve Hom, A. (2023). #{emph[Face Analysis Technology Evaluation (FATE) Part 10: Performance of Passive, Software-Based Presentation Attack Detection (PAD) Algorithms.]} NIST IR 8491, Eylül 2023.]

#kaynak("10")[CEN (2024). #{emph[CEN\/TS 18099:2024 Biometric data injection attack detection.]} Avrupa Standardizasyon Komitesi.]

#kaynak("11")[ETSI (2025). #{emph[ETSI TS 119 461 V2.1.1: Electronic Signatures and Trust Infrastructures (ESI); Policy and security requirements for trust service components providing identity proofing of trust service subjects.]} Şubat 2025.]

#kaynak("12")[Avrupa Komisyonu (2025). #{emph[Nitelikli sertifikanın ya da nitelikli elektronik öznitelik onayının verileceği kişinin kimliğinin ve özniteliklerinin doğrulanmasına ilişkin referans standartlar bakımından 910\/2014 sayılı Tüzüğün uygulanmasına dair kurallar koyan 2025\/1566 sayılı Uygulama Tüzüğü (AB).]} Avrupa Birliği Resmî Gazetesi, 30 Temmuz 2025.]

#kaynak("13")[Ferrara, M., Franco, A. ve Maltoni, D. (2014). "The magic passport." #{emph[IEEE International Joint Conference on Biometrics (IJCB 2014)]}.]

#kaynak("14")[ICAO (2021). #{emph[Doc 9303: Machine Readable Travel Documents.]} Sekizinci baskı; özellikle Bölüm 10 (Logical Data Structure), Bölüm 11 (Security Mechanisms for MRTDs) ve Bölüm 12 (Public Key Infrastructure for MRTDs).]

#kaynak("15")[Avrupa Parlamentosu ve Konseyi (2019). #{emph[Birlik vatandaşlarının kimlik kartlarının ve serbest dolaşım hakkını kullanan Birlik vatandaşları ile aile üyelerine verilen ikamet belgelerinin güvenliğinin güçlendirilmesine ilişkin 2019\/1157 sayılı Tüzük (AB).]} Avrupa Birliği Resmî Gazetesi, L 188, 12 Temmuz 2019.]

#kaynak("16")[Avrupa Parlamentosu ve Konseyi (2024). #{emph[Avrupa Dijital Kimlik Çerçevesinin oluşturulması bakımından 910\/2014 sayılı Tüzüğü değiştiren 2024\/1183 sayılı Tüzük (AB).]} Avrupa Birliği Resmî Gazetesi, 30 Nisan 2024.]

#kaynak("17")[Avrupa Parlamentosu ve Konseyi (2024). #{emph[Yapay zekâya ilişkin uyumlaştırılmış kurallar koyan 2024\/1689 sayılı Tüzük (AB) (Yapay Zekâ Tüzüğü).]} Avrupa Birliği Resmî Gazetesi, 12 Temmuz 2024; özellikle madde 3(60) ve madde 50.]

#kaynak("18")[Bankacılık Düzenleme ve Denetleme Kurumu (2021). #{emph[Bankalarca Kullanılacak Uzaktan Kimlik Tespiti Yöntemlerine ve Elektronik Ortamda Sözleşme İlişkisinin Kurulmasına İlişkin Yönetmelik.]} Resmî Gazete, 1 Nisan 2021, sayı 31441.]

#kaynak("19")[Türkiye Cumhuriyet Merkez Bankası (2026). #{emph[Ödeme ve Elektronik Para Kuruluşlarının Bilgi Sistemleri ile Ödeme Hizmetleri Alanında Veri Paylaşım Servislerine İlişkin Tebliğde Değişiklik Yapılmasına Dair Tebliğ.]} Resmî Gazete, 4 Eylül 2026.]

#kaynak("20")[ICAO. #{emph[ICAO PKD Participants.]} icao.int\/icao-pkd\/participants (erişim: Kasım 2026).]

#kaynak("21")[Grother, P., Ngan, M. ve Hanaoka, K. (2019). #{emph[Face Recognition Vendor Test (FRVT) Part 3: Demographic Effects.]} NISTIR 8280, Aralık 2019.]

#kaynak("22")[Fett, D., Yasuda, K. ve Campbell, B. (2025). #{emph[Selective Disclosure for JWTs (SD-JWT).]} IETF RFC 9901, Kasım 2025. Ayrıca: #{emph[SD-JWT-based Verifiable Credentials (SD-JWT VC)]}, IETF OAuth Çalışma Grubu taslağı.]

#kaynak("23")[ISO\/IEC (2021). #{emph[ISO\/IEC 18013-5:2021 Personal identification — ISO-compliant driving licence — Part 5: Mobile driving licence (mDL) application.]}]

#heading(level: 1, numbering: none)[Okuma listesi: Buradan başlayın]

+ #{strong[ENISA, #{emph[Remote Identity Proofing: Attacks & Countermeasures]} (2022).]} Uzaktan kimlik kanıtlamaya yönelik saldırıların ve karşı önlemlerin, sektör görüşleriyle birlikte sistemli bir haritası. Teknik olmayan okur için de okunaklı.
+ #{strong[NIST IR 8491, #{emph[FATE Part 10]} (2023), yönetici özeti ve teknik özet.]} Canlılık tespitinin bağımsız bir laboratuvarda nasıl ölçüldüğünü ve sonuçların ne kadar değişken olduğunu ilk elden gösterir.
+ #{strong[ICAO Doc 9303, Bölüm 11.]} Erişim denetimi, pasif doğrulama, aktif doğrulama ve çip doğrulamanın resmî ve eksiksiz tarifi. Ücretsiz olarak erişilebilir.
+ #{strong[Ferrara, Franco ve Maltoni, #{emph[The magic passport]} (2014).]} Kısa bir makale; bir belge fotoğrafının kendisinin nasıl bir saldırı aracına dönüşebileceğini ilk gösteren çalışma.
+ #{strong[2025\/1566 sayılı Uygulama Tüzüğü ve ETSI TS 119 461’in giriş bölümleri.]} Avrupa’nın uzaktan kimlik kanıtlamayı nasıl ortak ve denetlenebilir bir kurala bağladığını gösterir.

#heading(level: 1, numbering: none)[Ek A — Sözlük]

#tablo([#{strong[Tablo A.1.]} Terimler sözlüğü.], (15fr, 24fr, 48fr), ([Terim], [İngilizce], [Anlamı],), (
  ([Aktif doğrulama], [active authentication], [Çipin, içindeki kopyalanamaz gizli anahtarla rastgele bir sınamayı imzalayarak kopya olmadığını kanıtlaması],),
  ([APCER], [attack presentation classification error rate], [Saldırı sunumlarından gerçek sayılanların oranı; kaçırılan saldırılar],),
  ([BAC], [basic access control], [MRZ’den türetilen parolayla çipe erişimi sağlayan ilk kuşak erişim denetimi],),
  ([Belge güvenlik nesnesi], [document security object (EF.SOD)], [Çipteki veri gruplarının özetlerini ve belgeyi verenin imzasını taşıyan dosya],),
  ([Belge imzalayıcı], [document signer (DS)], [Çipteki verileri imzalayan devlet anahtarı ve sertifikası],),
  ([BPCER], [bona fide presentation classification error rate], [Gerçek kullanıcı sunumlarından saldırı sayılanların oranı; haksız retler],),
  ([Canlılık tespiti, sunum saldırısı tespiti], [liveness detection, presentation attack detection (PAD)], [Kameranın önündeki yüzün canlı ve gerçek olup olmadığını anlamaya çalışan yöntem],),
  ([Cihaz doğrulama], [device attestation], [Telefonun güvenli donanımının, cihazın ve uygulamanın bütünlüğünü imzalı beyanla kanıtlaması],),
  ([Çip doğrulama], [chip authentication], [Çipin, bir anahtar anlaşmasıyla gizli anahtarına sahip olduğunu kanıtlaması],),
  ([CSCA], [country signing certificate authority], [Bir ülkenin belge imzalayıcı sertifikalarını veren kök otorite],),
  ([Deepfake], [deepfake], [Yapay zekâyla üretilmiş ya da değiştirilmiş, gerçekmiş gibi görünen görüntü, ses ya da video],),
  ([Enjeksiyon saldırısı], [injection attack], [Sahte görüntünün kameranın önüne konmak yerine doğrudan kameranın arkasından yazılıma verilmesi],),
  ([Harmanlanmış portre], [morphing attack], [İki kişinin yüzünün birleştirilmesiyle, ikisine de eşleşen bir belge fotoğrafı üretilmesi],),
  ([Kimlik kanıtlama], [identity proofing], [Bir kişinin kimliğinin ilk kez, güvenilir kanıtlarla tespit edilmesi],),
  ([Makinece okunabilir bölge], [machine readable zone (MRZ)], [Belgenin altındaki, sağlama haneli, makinece okunmak üzere düzenlenmiş satırlar],),
  ([NFC], [near field communication], [Birkaç santimetrede çalışan, çipli belgelerin telefonla okunmasını sağlayan radyo iletişimi],),
  ([PACE], [password authenticated connection establishment], [Belgenin üzerindeki bir parolayla çipe güvenli erişim sağlayan, BAC’den güçlü yöntem],),
  ([Para katırı], [money mule], [Kendi gerçek kimliğiyle hesap açıp bu hesabı suçlulara kullandıran kişi],),
  ([Pasif doğrulama], [passive authentication], [Çipteki verinin, belgeyi veren devletin imzasıyla doğrulanması],),
  ([PKD], [public key directory], [ICAO’nun ülkelerin belge imzalama sertifikalarını paylaştığı ortak dizin],),
  ([Sahip bağlama], [holder binding], [Belgenin, sahibinin cihazındaki bir anahtara bağlanması ve her gösterimde bunun kanıtlanması],),
  ([Sentetik kimlik], [synthetic identity], [Gerçek ve uydurma bilgilerin karışımından oluşan, arkasında gerçek bir kişi bulunmayan kimlik],),
  ([Sunum saldırısı], [presentation attack], [Kameranın önüne gerçek yüz yerine bir taklit konması],),
  ([Uzaktan kimlik doğrulama], [remote identity verification (IDV)], [Bir kişinin kimliğinin yüz yüze gelmeden, belge ve biyometri kullanılarak doğrulanması],),
  ([Veri grubu], [data group (DG)], [Çipteki bilgilerin düzenlendiği numaralı dosyalar (DG1, DG2 …)],),
  ([Yanlış eşleşme oranı], [false match rate (FMR)], [Farklı iki kişinin aynı kişi sayılma sıklığı],),
))
