import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import type { LaptopCondition, UsageCategory, LaptopRecommendation } from '@/types/laptop'

export const useAdvisorStore = defineStore('advisor', () => {
  // State
  const selectedUsage = ref<UsageCategory>('student')
  const budgetMax = ref<number>(45) // in million Tomans
  const condition = ref<LaptopCondition>('all')
  const activeStep = ref<number>(1)
  
  // Persistent bookmarked laptops using VueUse useLocalStorage
  const favorites = useLocalStorage<string[]>('consultation_favorites', [])

  // Sample verified laptops curated by experts
  const laptopCatalog = ref<LaptopRecommendation[]>([
    {
      id: 'thinkpad-t14-gen2',
      title: 'Lenovo ThinkPad T14 Gen 2',
      brand: 'Lenovo',
      category: 'programming',
      condition: 'stock',
      priceRange: '۲۶ تا ۲۹ میلیون تومان',
      priceValue: 28,
      specs: {
        cpu: 'Intel Core i5-1145G7',
        ram: '16GB DDR4 (قابل ارتقا)',
        storage: '512GB NVMe SSD',
        gpu: 'Intel Iris Xe Graphics',
        display: '14" FHD IPS مات'
      },
      strengths: ['کیبورد افسانه‌ای و ارگونومیک', 'بدنه نظامی ضد ضربه', 'دوام باتری بالا و تعمیرپذیری آسان'],
      recommendedFor: 'برنامه‌نویسی، کارهای اداری سنگین و دانشجویی',
      badge: 'پرفروش‌ترین استوک'
    },
    {
      id: 'asus-vivobook-15-oled',
      title: 'ASUS Vivobook 15 OLED (X1505)',
      brand: 'ASUS',
      category: 'graphic_design',
      condition: 'new',
      priceRange: '۳۸ تا ۴۲ میلیون تومان',
      priceValue: 40,
      specs: {
        cpu: 'Intel Core i7-1355U',
        ram: '16GB DDR4',
        storage: '1TB M.2 NVMe',
        gpu: 'Intel Iris Xe',
        display: '15.6" OLED 2.8K 120Hz 100% DCI-P3'
      },
      strengths: ['صفحه نمایش OLED خیره‌کننده با دقت رنگ بالا', 'پردازنده نسل ۱۳', 'طراحی باریک و سبک'],
      recommendedFor: 'طراحی گرافیک، فتوشاپ، UI/UX و تماشای فیلم',
      badge: 'بهترین صفحه نمایش'
    },
    {
      id: 'lenovo-loq-15',
      title: 'Lenovo LOQ 15IRX9',
      brand: 'Lenovo',
      category: 'gaming',
      condition: 'new',
      priceRange: '۵۸ تا ۶۴ میلیون تومان',
      priceValue: 62,
      specs: {
        cpu: 'Intel Core i7-13650HX',
        ram: '16GB DDR5 4800MHz',
        storage: '512GB PCIe 4.0 SSD',
        gpu: 'NVIDIA RTX 4060 8GB (115W)',
        display: '15.6" FHD 144Hz 100% sRGB'
      },
      strengths: ['گرافیک قدرتمند RTX 4060', 'سیستم خنک‌کننده دوگانه کارآمد', 'پردازنده ۲۴ هسته‌ای قوی'],
      recommendedFor: 'گیمینگ سنگین، رندرینگ سه‌بعدی و هوش مصنوعی',
      badge: 'ارزش خرید فوق‌العاده'
    },
    {
      id: 'dell-precision-5540',
      title: 'Dell Precision 5540 Workstation',
      brand: 'Dell',
      category: 'engineering',
      condition: 'stock',
      priceRange: '۳۴ تا ۳۸ میلیون تومان',
      priceValue: 36,
      specs: {
        cpu: 'Intel Core i7-9850H (6 Core 12 Thread)',
        ram: '32GB DDR4',
        storage: '1TB NVMe High Speed',
        gpu: 'NVIDIA Quadro T2000 4GB VRAM',
        display: '15.6" FHD PremierColor IPS'
      },
      strengths: ['کارت گرافیک کوادرو پایدار برای SolidWorks', '۳۲ گیگابایت رم عالی برای رندر', 'شاسی فیبر کربن و آلومینیوم'],
      recommendedFor: 'مهندسی مکانیک، معماری، AutoCAD و رندرهای طولانی',
      badge: 'ورک‌استیشن مهندسی'
    },
    {
      id: 'acer-aspire-lite',
      title: 'Acer Aspire Lite 15',
      brand: 'Acer',
      category: 'student',
      condition: 'new',
      priceRange: '۲۱ تا ۲۴ میلیون تومان',
      priceValue: 23,
      specs: {
        cpu: 'Intel Core i3-1215U',
        ram: '8GB DDR4 (قابل ارتقا به ۱۶)',
        storage: '256GB NVMe SSD',
        gpu: 'Intel UHD Graphics',
        display: '15.6" FHD IPS'
      },
      strengths: ['قیمت اقتصادی و بودجه‌محور', 'پردازنده نسل ۱۲ کم‌مصرف', 'گارانتی رسمی ۲۴ ماهه'],
      recommendedFor: 'دانشجویی، کلاس آنلاین، آفیس و امور روزمره',
      badge: 'اقتصادی نو'
    }
  ])

  // Filtered recommendations based on user selections
  const recommendedLaptops = computed(() => {
    return laptopCatalog.value.filter(item => {
      // Condition filter
      if (condition.value !== 'all' && item.condition !== condition.value) {
        return false
      }
      // Budget filter (allows up to 15% tolerance above budget)
      if (item.priceValue > budgetMax.value * 1.15) {
        return false
      }
      // Category affinity
      if (selectedUsage.value !== 'general' && item.category !== selectedUsage.value && selectedUsage.value !== 'student') {
        return false
      }
      return true
    })
  })

  // Actions
  function toggleFavorite(laptopId: string) {
    const idx = favorites.value.indexOf(laptopId)
    if (idx >= 0) {
      favorites.value.splice(idx, 1)
    } else {
      favorites.value.push(laptopId)
    }
  }

  function isFavorite(laptopId: string): boolean {
    return favorites.value.includes(laptopId)
  }

  function setBudget(val: number) {
    budgetMax.value = val
  }

  function setUsage(val: UsageCategory) {
    selectedUsage.value = val
  }

  function setCondition(val: LaptopCondition) {
    condition.value = val
  }

  return {
    selectedUsage,
    budgetMax,
    condition,
    activeStep,
    favorites,
    laptopCatalog,
    recommendedLaptops,
    toggleFavorite,
    isFavorite,
    setBudget,
    setUsage,
    setCondition
  }
})
