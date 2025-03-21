const translation = {
  title: 'Günlükler',
  description: 'Günlükler, kullanıcının girdileri ve AI tepkileri dahil olmak üzere uygulamanın çalışma durumunu kaydeder.',
  dateTimeFormat: 'GG/AA/YYYY ss:dd ÖÖ/ÖS',
  table: {
    header: {
      updatedTime: 'Güncellenme zamanı',
      time: 'Oluşturulma zamanı',
      endUser: 'Son Kullanıcı veya Hesap',
      input: 'Girdi',
      output: 'Çıktı',
      summary: 'Başlık',
      messageCount: 'Mesaj Sayısı',
      userRate: 'Kullanıcı Puanı',
      adminRate: 'Op. Puanı',
      startTime: 'BAŞLANGIÇ ZAMANI',
      status: 'DURUM',
      runtime: 'ÇALIŞMA SÜRESİ',
      tokens: 'TOKENLAR',
      user: 'SON KULLANICI VEYA HESAP',
      version: 'VERSİYON',
    },
    pagination: {
      previous: 'Önceki',
      next: 'Sonraki',
    },
    empty: {
      noChat: 'Henüz konuşma yok',
      noOutput: 'Çıktı yok',
      element: {
        title: 'Kimse var mı?',
        content: 'Son kullanıcılar ve AI uygulamaları arasındaki etkileşimleri gözlemleyin ve açıklamalar ekleyin, böylece AI doğruluğunu sürekli olarak artırabilirsiniz. Web Uygulamasını <shareLink>paylaşmayı</shareLink> veya <testLink>kendiniz test etmeyi</testLink> deneyebilir, ardından bu sayfaya geri dönebilirsiniz.',
      },
    },
  },
  detail: {
    time: 'Zaman',
    conversationId: 'Konuşma ID',
    promptTemplate: 'Prompt Şablonu',
    promptTemplateBeforeChat: 'Sohbet Öncesi Prompt Şablonu · Sistem Mesajı Olarak',
    annotationTip: '{{user}} tarafından işaretlenen iyileştirmeler',
    timeConsuming: 'Geçen Süre',
    second: 's',
    tokenCost: 'Token harcanan',
    loading: 'yükleniyor',
    operation: {
      like: 'beğeni',
      dislike: 'beğenmeme',
      addAnnotation: 'İyileştirme Ekle',
      editAnnotation: 'İyileştirme Düzenle',
      annotationPlaceholder: 'AI\'ın yanıtlamasını istediğiniz beklenen cevabı girin, bu, model ince ayarı ve metin üretim kalitesinin sürekli iyileştirilmesi için kullanılabilir.',
    },
    variables: 'Değişkenler',
    uploadImages: 'Yüklenen Görseller',
    modelParams: 'Model parametreleri',
  },
  filter: {
    period: {
      today: 'Bugün',
      last7days: 'Son 7 Gün',
      last4weeks: 'Son 4 Hafta',
      last3months: 'Son 3 Ay',
      last12months: 'Son 12 Ay',
      monthToDate: 'Ay Başlangıcından İtibaren',
      quarterToDate: 'Çeyrek Başlangıcından İtibaren',
      yearToDate: 'Yıl Başlangıcından İtibaren',
      allTime: 'Tüm Zamanlar',
    },
    annotation: {
      all: 'Hepsi',
      annotated: 'Açıklamalı İyileştirmeler ({{count}} öğe)',
      not_annotated: 'Açıklanmamış',
    },
    sortBy: 'Sıralama ölçütü:',
    descending: 'azalan',
    ascending: 'artan',
  },
  workflowTitle: 'Workflow Günlükleri',
  workflowSubtitle: 'Günlük, Automate\'in çalışmasını kaydetmiştir.',
  runDetail: {
    title: 'Konuşma Günlüğü',
    workflowTitle: 'Günlük Detayı',
    fileListDetail: 'Ayrıntı',
    fileListLabel: 'Dosya Detayları',
  },
  promptLog: 'Prompt Günlüğü',
  agentLog: 'Agent Günlüğü',
  viewLog: 'Günlüğü Görüntüle',
  agentLogDetail: {
    agentMode: 'Agent Modu',
    toolUsed: 'Kullanılan Araç',
    iterations: 'Yinelemeler',
    iteration: 'Yineleme',
    finalProcessing: 'Son İşleme',
  },
}

export default translation
