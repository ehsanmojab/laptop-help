export type LaptopCondition = 'all' | 'new' | 'stock'

export type UsageCategory = 
  | 'engineering' 
  | 'graphic_design' 
  | 'programming' 
  | 'gaming' 
  | 'student' 
  | 'general'

export interface LaptopRecommendation {
  id: string
  title: string
  brand: string
  category: UsageCategory
  condition: 'new' | 'stock'
  priceRange: string
  priceValue: number // in Million Tomans
  specs: {
    cpu: string
    ram: string
    storage: string
    gpu: string
    display: string
  }
  strengths: string[]
  recommendedFor: string
  badge?: string
}

export interface ConsultationPreferences {
  budgetMax: number
  usage: UsageCategory
  condition: LaptopCondition
  priorityPortability: boolean
  screenSizePreference: '13-14' | '15.6' | '16+' | 'any'
}
