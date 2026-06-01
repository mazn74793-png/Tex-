/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type FabricPlacement = "Hero" | "Showcase" | "General";

export interface FabricItem {
  id: string;
  nameAr: string;
  nameEn: string;
  categoryAr: string;
  categoryEn: string;
  descriptionAr: string;
  descriptionEn: string;
  pricePerMeterAr: string;
  pricePerMeterEn: string;
  unsplashUrl: string;
  originAr: string;
  originEn: string;
  weightGsm: number;
  compositionAr: string;
  compositionEn: string;
  placement: FabricPlacement;
  lustreRatingAr: string; // e.g., "بريق ملوكي خافت", "انعكاس متلألئ"
  drapeAr: string; // e.g., "انسياب كامل وثقيل", "قوام متموج ناعم"
}

export interface QuizState {
  currentStep: number;
  event: string;      // bridal, formal_gala, winter_coat, daily_luxury
  feel: string;       // silk, velvet, wool, linen
  styleIntent: string; // minimalist, avant_garde, grandeur
}

export interface Message {
  id: string;
  sender: "user" | "advisor";
  content: string;
  timestamp: Date;
}
