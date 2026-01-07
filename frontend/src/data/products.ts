export interface Product {
  id: string;
  name: string;
  category: string;
  categorySlug: string;
  description: string;
  features: string[];
  applications: string[];
  dosage?: string;
  composition?: string;
  packing?: string[];
  image: string;
}

export interface ProductCategory {
  name: string;
  slug: string;
  icon: string;
  description: string;
  products: Product[];
}

export const productCategories: ProductCategory[] = [
  {
    name: "Flowering Stimulant",
    slug: "flowering-stimulant",
    icon: "Sprout",
    description: "Premium flowering stimulants to enhance bloom quality and yield in agricultural crops.",
    products: [
      {
        id: "redox-reporter-flowering-stimulant",
        name: "Redox Reporter Flowering Stimulant",
        category: "Flowering Stimulant",
        categorySlug: "flowering-stimulant",
        description: "A powerful flowering stimulant designed to enhance flower initiation and development in crops. It promotes uniform flowering and increases fruit set percentage.",
        features: [
          "Enhances flower initiation",
          "Promotes uniform flowering",
          "Increases fruit set percentage",
          "Improves crop yield quality"
        ],
        applications: ["Cotton", "Vegetables", "Fruits", "Pulses", "Oilseeds"],
        dosage: "1-2 ml per liter of water",
        composition: "Nitrobenzene 20% w/w",
        packing: ["100ml", "250ml", "500ml", "1L", "5L"],
        image: "/placeholder.svg"
      },
      {
        id: "nitrobenzene-35-pgr",
        name: "Nitrobenzene 35% PGR",
        category: "Flowering Stimulant",
        categorySlug: "flowering-stimulant",
        description: "High-concentration plant growth regulator with 35% Nitrobenzene for enhanced flowering and fruit development.",
        features: [
          "High concentration formula",
          "Fast-acting results",
          "Enhanced flowering response",
          "Improved fruit quality"
        ],
        applications: ["All flowering crops", "Fruit trees", "Vegetables"],
        dosage: "0.5-1 ml per liter of water",
        composition: "Nitrobenzene 35% w/w",
        packing: ["100ml", "250ml", "500ml", "1L"],
        image: "/placeholder.svg"
      },
      {
        id: "renew-bio-stimulant",
        name: "Renew Bio Stimulant",
        category: "Flowering Stimulant",
        categorySlug: "flowering-stimulant",
        description: "Organic bio-stimulant that rejuvenates plant vigor and stimulates natural flowering mechanisms.",
        features: [
          "100% organic formulation",
          "Rejuvenates plant vigor",
          "Natural flowering stimulation",
          "Safe for organic farming"
        ],
        applications: ["Organic farms", "All crops", "Horticulture"],
        dosage: "2-3 ml per liter of water",
        packing: ["250ml", "500ml", "1L"],
        image: "/placeholder.svg"
      },
      {
        id: "reset-flowering-stimulant",
        name: "Reset Flowering Stimulant",
        category: "Flowering Stimulant",
        categorySlug: "flowering-stimulant",
        description: "Advanced flowering stimulant that resets and synchronizes flowering across the entire crop for uniform harvest.",
        features: [
          "Synchronizes flowering",
          "Uniform harvest timing",
          "Reduces flowering period",
          "Maximizes yield potential"
        ],
        applications: ["Cotton", "Chilli", "Tomato", "Brinjal", "Pulses"],
        dosage: "1.5-2 ml per liter of water",
        composition: "Nitrobenzene with micronutrients",
        packing: ["100ml", "250ml", "500ml", "1L"],
        image: "/placeholder.svg"
      },
      {
        id: "reshot-super-flowering-stimulant",
        name: "Reshot Super Flowering Stimulant",
        category: "Flowering Stimulant",
        categorySlug: "flowering-stimulant",
        description: "Super concentrated flowering stimulant for maximum flower induction and retention.",
        features: [
          "Super concentrated formula",
          "Maximum flower induction",
          "High retention rate",
          "Professional grade"
        ],
        applications: ["Commercial farms", "High-value crops", "Export quality produce"],
        dosage: "0.5-1 ml per liter of water",
        packing: ["100ml", "250ml", "500ml"],
        image: "/placeholder.svg"
      },
      {
        id: "refil-flowering-stimulant",
        name: "Refil Flowering Stimulant",
        category: "Flowering Stimulant",
        categorySlug: "flowering-stimulant",
        description: "Refill pack flowering stimulant for continuous application throughout the flowering season.",
        features: [
          "Economical refill pack",
          "Consistent quality",
          "Extended application",
          "Cost-effective solution"
        ],
        applications: ["All flowering crops", "Seasonal vegetables"],
        dosage: "1-2 ml per liter of water",
        packing: ["500ml", "1L", "5L"],
        image: "/placeholder.svg"
      },
      {
        id: "plant-growth-promoter-fs",
        name: "Plant Growth Promoter",
        category: "Flowering Stimulant",
        categorySlug: "flowering-stimulant",
        description: "Multi-purpose plant growth promoter that enhances overall plant development and flowering.",
        features: [
          "Multi-purpose formula",
          "Overall plant development",
          "Enhanced flowering",
          "Root development support"
        ],
        applications: ["All crops", "Nurseries", "Greenhouses"],
        dosage: "2 ml per liter of water",
        packing: ["250ml", "500ml", "1L"],
        image: "/placeholder.svg"
      },
      {
        id: "return-flowering-stimulant",
        name: "Return Flowering Stimulant",
        category: "Flowering Stimulant",
        categorySlug: "flowering-stimulant",
        description: "Specialized stimulant for inducing second flush of flowering in perennial crops.",
        features: [
          "Second flush induction",
          "Perennial crop specialist",
          "Extended harvest season",
          "Increased total yield"
        ],
        applications: ["Mango", "Citrus", "Pomegranate", "Grape"],
        dosage: "1.5 ml per liter of water",
        packing: ["250ml", "500ml", "1L"],
        image: "/placeholder.svg"
      },
      {
        id: "nano-stimulant",
        name: "Nano Stimulant",
        category: "Flowering Stimulant",
        categorySlug: "flowering-stimulant",
        description: "Nano-technology based stimulant for superior absorption and faster action on flowering.",
        features: [
          "Nano-technology formula",
          "Superior absorption",
          "Faster action",
          "Reduced application rate"
        ],
        applications: ["High-tech farming", "Precision agriculture", "All crops"],
        dosage: "0.5 ml per liter of water",
        packing: ["100ml", "250ml"],
        image: "/placeholder.svg"
      }
    ]
  },
  {
    name: "Auxin Growth Promoter",
    slug: "auxin-growth-promoter",
    icon: "Leaf",
    description: "Auxin-based growth promoters for enhanced root development, cell elongation, and overall plant growth.",
    products: [
      {
        id: "sodium-salt-nitrophenolate",
        name: "Sodium Salt of Nitrophenolate",
        category: "Auxin Growth Promoter",
        categorySlug: "auxin-growth-promoter",
        description: "Premium quality sodium salt of nitrophenolate for enhanced plant metabolism and growth regulation.",
        features: [
          "Enhanced plant metabolism",
          "Improved nutrient uptake",
          "Stress resistance",
          "Growth regulation"
        ],
        applications: ["All crops", "Foliar application", "Seed treatment"],
        dosage: "1-2 gm per liter of water",
        composition: "Sodium Nitrophenolate 98%",
        packing: ["100gm", "250gm", "500gm", "1Kg"],
        image: "/placeholder.svg"
      },
      {
        id: "amino-acid-50",
        name: "Amino Acid 50%",
        category: "Auxin Growth Promoter",
        categorySlug: "auxin-growth-promoter",
        description: "High-quality amino acid complex with 50% concentration for protein synthesis and plant nutrition.",
        features: [
          "50% amino acid concentration",
          "Protein synthesis support",
          "Stress recovery",
          "Enhanced nutrition"
        ],
        applications: ["All crops", "Stress conditions", "Quality improvement"],
        dosage: "2-3 gm per liter of water",
        composition: "L-Amino Acids 50%",
        packing: ["250gm", "500gm", "1Kg", "5Kg"],
        image: "/placeholder.svg"
      },
      {
        id: "indole-butyric-acid",
        name: "Indole Butyric Acid",
        category: "Auxin Growth Promoter",
        categorySlug: "auxin-growth-promoter",
        description: "Pure Indole Butyric Acid (IBA) for superior root development in cuttings and transplants.",
        features: [
          "Superior root development",
          "Cutting propagation",
          "Transplant success",
          "Professional grade purity"
        ],
        applications: ["Nurseries", "Cutting propagation", "Tissue culture"],
        dosage: "500-1000 ppm dip treatment",
        composition: "Indole-3-Butyric Acid 99%",
        packing: ["10gm", "25gm", "100gm", "500gm"],
        image: "/placeholder.svg"
      },
      {
        id: "da-6",
        name: "DA-6 (Diethylaminoethyl Hexanoate)",
        category: "Auxin Growth Promoter",
        categorySlug: "auxin-growth-promoter",
        description: "Advanced plant growth regulator DA-6 for enhanced photosynthesis and nutrient transport.",
        features: [
          "Enhanced photosynthesis",
          "Improved nutrient transport",
          "Yield increase",
          "Quality improvement"
        ],
        applications: ["Cereals", "Vegetables", "Fruits", "Cash crops"],
        dosage: "8-12 ppm spray application",
        composition: "DA-6 98%",
        packing: ["10gm", "50gm", "100gm", "500gm"],
        image: "/placeholder.svg"
      },
      {
        id: "auxin-pgp",
        name: "Auxin Plant Growth Promoter",
        category: "Auxin Growth Promoter",
        categorySlug: "auxin-growth-promoter",
        description: "Balanced auxin formulation for overall plant growth promotion and development.",
        features: [
          "Balanced auxin levels",
          "Overall growth promotion",
          "Cell elongation",
          "Apical dominance"
        ],
        applications: ["All crops", "Vegetative growth", "Nurseries"],
        dosage: "1-2 ml per liter of water",
        packing: ["100ml", "250ml", "500ml", "1L"],
        image: "/placeholder.svg"
      },
      {
        id: "indole-3-acetic-acid",
        name: "Indole 3 Acetic Acid",
        category: "Auxin Growth Promoter",
        categorySlug: "auxin-growth-promoter",
        description: "Natural auxin IAA for plant growth regulation and development coordination.",
        features: [
          "Natural auxin source",
          "Growth coordination",
          "Cell division support",
          "Development regulation"
        ],
        applications: ["Research", "Tissue culture", "Specialized applications"],
        dosage: "As per requirement",
        composition: "IAA 99%",
        packing: ["5gm", "10gm", "25gm", "100gm"],
        image: "/placeholder.svg"
      },
      {
        id: "ascorbic-acid",
        name: "Ascorbic Acid",
        category: "Auxin Growth Promoter",
        categorySlug: "auxin-growth-promoter",
        description: "Pure ascorbic acid for antioxidant support and stress management in plants.",
        features: [
          "Antioxidant properties",
          "Stress management",
          "Quality improvement",
          "Shelf life extension"
        ],
        applications: ["Fruits", "Vegetables", "Post-harvest", "Quality crops"],
        dosage: "1-2 gm per liter of water",
        composition: "Ascorbic Acid 99%",
        packing: ["100gm", "250gm", "500gm", "1Kg"],
        image: "/placeholder.svg"
      },
      {
        id: "humic-amino-shiny-balls",
        name: "Humic Amino Shiny Balls",
        category: "Auxin Growth Promoter",
        categorySlug: "auxin-growth-promoter",
        description: "Unique shiny ball formulation combining humic acid and amino acids for soil and plant health.",
        features: [
          "Dual action formula",
          "Soil health improvement",
          "Plant nutrition",
          "Easy application"
        ],
        applications: ["Soil application", "All crops", "Organic farming"],
        dosage: "2-4 kg per acre",
        packing: ["1Kg", "5Kg", "25Kg"],
        image: "/placeholder.svg"
      },
      {
        id: "nitrophenolate-powder",
        name: "Nitrophenolate Powder",
        category: "Auxin Growth Promoter",
        categorySlug: "auxin-growth-promoter",
        description: "Technical grade nitrophenolate powder for formulation and direct application.",
        features: [
          "Technical grade purity",
          "Formulation ready",
          "Bulk availability",
          "Consistent quality"
        ],
        applications: ["Formulation industry", "Agricultural use"],
        dosage: "As per formulation",
        composition: "Nitrophenolate 98%",
        packing: ["100gm", "500gm", "1Kg", "25Kg"],
        image: "/placeholder.svg"
      },
      {
        id: "amino-acid",
        name: "Amino Acid",
        category: "Auxin Growth Promoter",
        categorySlug: "auxin-growth-promoter",
        description: "Standard amino acid formulation for plant nutrition and stress recovery.",
        features: [
          "Complete amino profile",
          "Plant nutrition",
          "Stress recovery",
          "Growth support"
        ],
        applications: ["All crops", "Foliar spray", "Fertigation"],
        dosage: "2-3 ml per liter of water",
        packing: ["250ml", "500ml", "1L", "5L"],
        image: "/placeholder.svg"
      },
      {
        id: "amino-acid-85",
        name: "Amino Acid 85%",
        category: "Auxin Growth Promoter",
        categorySlug: "auxin-growth-promoter",
        description: "Premium 85% amino acid powder for professional agricultural applications.",
        features: [
          "85% concentration",
          "Premium quality",
          "Professional grade",
          "High efficacy"
        ],
        applications: ["Commercial farming", "Export quality", "High-value crops"],
        dosage: "1-2 gm per liter of water",
        composition: "L-Amino Acids 85%",
        packing: ["250gm", "500gm", "1Kg", "25Kg"],
        image: "/placeholder.svg"
      },
      {
        id: "nitrobenzene-powder",
        name: "Nitrobenzene Powder",
        category: "Auxin Growth Promoter",
        categorySlug: "auxin-growth-promoter",
        description: "Technical nitrobenzene powder for flowering stimulation and growth regulation.",
        features: [
          "Powder formulation",
          "Easy mixing",
          "Stable storage",
          "Cost effective"
        ],
        applications: ["All flowering crops", "Formulation"],
        dosage: "1-2 gm per liter of water",
        packing: ["100gm", "250gm", "500gm", "1Kg"],
        image: "/placeholder.svg"
      }
    ]
  },
  {
    name: "Plant Growth Regulator",
    slug: "plant-growth-regulator",
    icon: "FlaskConical",
    description: "Comprehensive range of plant growth regulators for controlled and enhanced crop development.",
    products: [
      {
        id: "bio-stimulant",
        name: "Bio Stimulant",
        category: "Plant Growth Regulator",
        categorySlug: "plant-growth-regulator",
        description: "Organic bio-stimulant for natural plant growth enhancement and stress tolerance.",
        features: [
          "100% organic",
          "Natural growth enhancement",
          "Stress tolerance",
          "Eco-friendly"
        ],
        applications: ["Organic farming", "All crops", "Sustainable agriculture"],
        dosage: "2-3 ml per liter of water",
        packing: ["250ml", "500ml", "1L", "5L"],
        image: "/placeholder.svg"
      },
      {
        id: "rentac-flowering-stimulant",
        name: "Rentac Flowering Stimulant",
        category: "Plant Growth Regulator",
        categorySlug: "plant-growth-regulator",
        description: "Specialized flowering stimulant for enhanced reproductive growth in crops.",
        features: [
          "Reproductive growth focus",
          "Enhanced flowering",
          "Better fruit set",
          "Quality yield"
        ],
        applications: ["Flowering crops", "Fruit crops", "Vegetables"],
        dosage: "1-2 ml per liter of water",
        packing: ["100ml", "250ml", "500ml", "1L"],
        image: "/placeholder.svg"
      },
      {
        id: "regold-pgr",
        name: "ReGold Plant Growth Regulator",
        category: "Plant Growth Regulator",
        categorySlug: "plant-growth-regulator",
        description: "Gold standard plant growth regulator for premium crop production.",
        features: [
          "Premium formulation",
          "Comprehensive growth support",
          "High-value crop specialist",
          "Export quality results"
        ],
        applications: ["Export crops", "Premium vegetables", "Fruits"],
        dosage: "1 ml per liter of water",
        packing: ["100ml", "250ml", "500ml"],
        image: "/placeholder.svg"
      },
      {
        id: "return-flowering-pgr",
        name: "RETURN Flowering Stimulant",
        category: "Plant Growth Regulator",
        categorySlug: "plant-growth-regulator",
        description: "Induces return bloom in perennial crops for extended production season.",
        features: [
          "Return bloom induction",
          "Extended production",
          "Perennial specialist",
          "Yield maximization"
        ],
        applications: ["Mango", "Citrus", "Grapes", "Pomegranate"],
        dosage: "1.5-2 ml per liter of water",
        packing: ["250ml", "500ml", "1L"],
        image: "/placeholder.svg"
      },
      {
        id: "rumicin-pgr",
        name: "Rumicin Plant Growth Regulator",
        category: "Plant Growth Regulator",
        categorySlug: "plant-growth-regulator",
        description: "Advanced plant growth regulator for balanced vegetative and reproductive growth.",
        features: [
          "Balanced growth",
          "Vegetative control",
          "Reproductive enhancement",
          "Crop synchronization"
        ],
        applications: ["All crops", "Commercial farming"],
        dosage: "1-2 ml per liter of water",
        packing: ["250ml", "500ml", "1L"],
        image: "/placeholder.svg"
      },
      {
        id: "rowdy-pgp",
        name: "Rowdy Plant Growth Promoter",
        category: "Plant Growth Regulator",
        categorySlug: "plant-growth-regulator",
        description: "Aggressive growth promoter for rapid vegetative development.",
        features: [
          "Rapid growth",
          "Vegetative boost",
          "Quick establishment",
          "Early vigor"
        ],
        applications: ["Transplants", "Early growth stage", "Nurseries"],
        dosage: "2-3 ml per liter of water",
        packing: ["250ml", "500ml", "1L"],
        image: "/placeholder.svg"
      },
      {
        id: "agricultural-pgp",
        name: "Agricultural Plant Growth Promoters",
        category: "Plant Growth Regulator",
        categorySlug: "plant-growth-regulator",
        description: "General-purpose agricultural growth promoter for all crop types.",
        features: [
          "General purpose",
          "All crop types",
          "Easy application",
          "Reliable results"
        ],
        applications: ["Field crops", "Vegetables", "Orchards"],
        dosage: "2 ml per liter of water",
        packing: ["500ml", "1L", "5L"],
        image: "/placeholder.svg"
      },
      {
        id: "reshot-super-pgr",
        name: "Reshot Super Plant Growth Regulator",
        category: "Plant Growth Regulator",
        categorySlug: "plant-growth-regulator",
        description: "Super concentrated growth regulator for professional agricultural use.",
        features: [
          "Super concentrated",
          "Professional grade",
          "Maximum efficacy",
          "Economic application"
        ],
        applications: ["Commercial farms", "Large-scale agriculture"],
        dosage: "0.5-1 ml per liter of water",
        packing: ["100ml", "250ml", "500ml"],
        image: "/placeholder.svg"
      },
      {
        id: "natural-pgr",
        name: "Natural Plant Growth Regulator",
        category: "Plant Growth Regulator",
        categorySlug: "plant-growth-regulator",
        description: "100% natural plant growth regulator derived from plant extracts.",
        features: [
          "100% natural",
          "Plant extract based",
          "Organic certified",
          "Safe for environment"
        ],
        applications: ["Organic farming", "Sustainable agriculture", "Export crops"],
        dosage: "2-3 ml per liter of water",
        packing: ["250ml", "500ml", "1L"],
        image: "/placeholder.svg"
      },
      {
        id: "sodium-nitrophenolate",
        name: "Sodium Nitrophenolate",
        category: "Plant Growth Regulator",
        categorySlug: "plant-growth-regulator",
        description: "High-purity sodium nitrophenolate for enhanced plant metabolic activity.",
        features: [
          "High purity",
          "Enhanced metabolism",
          "Growth stimulation",
          "Stress recovery"
        ],
        applications: ["All crops", "Stress conditions", "Recovery applications"],
        dosage: "1-2 gm per liter of water",
        composition: "Sodium Nitrophenolate 98%",
        packing: ["100gm", "250gm", "500gm", "1Kg"],
        image: "/placeholder.svg"
      },
      {
        id: "retry-pgp",
        name: "Retry Plant Growth Promoter",
        category: "Plant Growth Regulator",
        categorySlug: "plant-growth-regulator",
        description: "Retry formulation for crops recovering from stress or damage.",
        features: [
          "Stress recovery",
          "Damage repair",
          "Growth restoration",
          "Quick response"
        ],
        applications: ["Stressed crops", "Weather damage recovery", "Transplant shock"],
        dosage: "2-3 ml per liter of water",
        packing: ["250ml", "500ml", "1L"],
        image: "/placeholder.svg"
      },
      {
        id: "refund-pgs",
        name: "Refund Plant Growth Stimulant",
        category: "Plant Growth Regulator",
        categorySlug: "plant-growth-regulator",
        description: "Economic plant growth stimulant with guaranteed results or refund.",
        features: [
          "Guaranteed results",
          "Economic formulation",
          "Reliable performance",
          "Customer satisfaction"
        ],
        applications: ["All crops", "Budget farming", "Small farmers"],
        dosage: "2 ml per liter of water",
        packing: ["250ml", "500ml", "1L"],
        image: "/placeholder.svg"
      },
      {
        id: "humic-acid-flakes",
        name: "Humic Acid Flacks 95% WSG",
        category: "Plant Growth Regulator",
        categorySlug: "plant-growth-regulator",
        description: "95% water-soluble humic acid flakes for soil health and plant growth.",
        features: [
          "95% purity",
          "Water soluble",
          "Soil health",
          "Plant growth support"
        ],
        applications: ["Soil application", "Fertigation", "All crops"],
        dosage: "1-2 kg per acre",
        composition: "Humic Acid 95% WSG",
        packing: ["500gm", "1Kg", "5Kg", "25Kg"],
        image: "/placeholder.svg"
      },
      {
        id: "red-flower-pgr",
        name: "Red Flower Plant Growth Regulator",
        category: "Plant Growth Regulator",
        categorySlug: "plant-growth-regulator",
        description: "Specialized growth regulator for ornamental and flowering plants.",
        features: [
          "Ornamental specialist",
          "Enhanced flowering",
          "Color enhancement",
          "Flower longevity"
        ],
        applications: ["Floriculture", "Ornamentals", "Cut flowers"],
        dosage: "1-2 ml per liter of water",
        packing: ["100ml", "250ml", "500ml"],
        image: "/placeholder.svg"
      },
      {
        id: "natca",
        name: "NATCA",
        category: "Plant Growth Regulator",
        categorySlug: "plant-growth-regulator",
        description: "N-Acetyl-L-Cysteine based plant growth regulator for stress management.",
        features: [
          "Stress management",
          "Antioxidant support",
          "Cell protection",
          "Growth enhancement"
        ],
        applications: ["Stress conditions", "High-value crops", "Quality production"],
        dosage: "0.5-1 gm per liter of water",
        composition: "NATCA 98%",
        packing: ["50gm", "100gm", "250gm"],
        image: "/placeholder.svg"
      }
    ]
  },
  {
    name: "Bio Pesticides",
    slug: "bio-pesticides",
    icon: "Bug",
    description: "Eco-friendly bio-pesticides for effective pest control without harming the environment.",
    products: [
      {
        id: "rdx-insecticide",
        name: "RDX Insecticide",
        category: "Bio Pesticides",
        categorySlug: "bio-pesticides",
        description: "Powerful bio-insecticide for broad-spectrum pest control in crops.",
        features: [
          "Broad-spectrum control",
          "Bio-based formula",
          "Safe for beneficials",
          "No resistance buildup"
        ],
        applications: ["All crops", "Vegetables", "Fruits", "Cotton"],
        dosage: "2-3 ml per liter of water",
        packing: ["100ml", "250ml", "500ml", "1L"],
        image: "/placeholder.svg"
      },
      {
        id: "rbx-emamectin-benzoate",
        name: "RBX Emamectin Benzoate",
        category: "Bio Pesticides",
        categorySlug: "bio-pesticides",
        description: "Emamectin benzoate formulation for effective caterpillar and borer control.",
        features: [
          "Caterpillar control",
          "Borer specialist",
          "Translaminar action",
          "Long residual effect"
        ],
        applications: ["Cotton", "Vegetables", "Pulses", "Fruits"],
        dosage: "0.4 gm per liter of water",
        composition: "Emamectin Benzoate 5% SG",
        packing: ["50gm", "100gm", "250gm", "500gm"],
        image: "/placeholder.svg"
      },
      {
        id: "revenue-pgr",
        name: "Revenue Plant Growth Regulator",
        category: "Bio Pesticides",
        categorySlug: "bio-pesticides",
        description: "Dual-action product combining pest control with growth regulation.",
        features: [
          "Dual action",
          "Pest control",
          "Growth support",
          "Complete protection"
        ],
        applications: ["Integrated pest management", "All crops"],
        dosage: "2 ml per liter of water",
        packing: ["250ml", "500ml", "1L"],
        image: "/placeholder.svg"
      },
      {
        id: "rdx-super-biopesticide",
        name: "RDX Super Biopesticide",
        category: "Bio Pesticides",
        categorySlug: "bio-pesticides",
        description: "Super concentrated bio-pesticide for severe pest infestations.",
        features: [
          "Super concentrated",
          "Severe infestation control",
          "Quick knockdown",
          "Extended protection"
        ],
        applications: ["Heavy infestation", "Emergency control", "All crops"],
        dosage: "1-2 ml per liter of water",
        packing: ["100ml", "250ml", "500ml"],
        image: "/placeholder.svg"
      },
      {
        id: "remove-biopesticide",
        name: "Remove Biopesticide",
        category: "Bio Pesticides",
        categorySlug: "bio-pesticides",
        description: "Targeted bio-pesticide for specific pest removal without crop damage.",
        features: [
          "Targeted action",
          "Specific pest control",
          "Crop safe",
          "Organic compatible"
        ],
        applications: ["Organic farming", "Targeted pest control"],
        dosage: "2-3 ml per liter of water",
        packing: ["250ml", "500ml", "1L"],
        image: "/placeholder.svg"
      }
    ]
  },
  {
    name: "Bio Fungicides",
    slug: "bio-fungicides",
    icon: "Shield",
    description: "Biological fungicides for effective disease management in crops.",
    products: [
      {
        id: "recure-bio-fungicide",
        name: "Recure Bio Fungicide",
        category: "Bio Fungicides",
        categorySlug: "bio-fungicides",
        description: "Curative bio-fungicide for treating existing fungal infections in crops.",
        features: [
          "Curative action",
          "Fungal infection treatment",
          "Plant recovery support",
          "Bio-based formula"
        ],
        applications: ["Infected crops", "Disease management", "All crops"],
        dosage: "2-3 ml per liter of water",
        packing: ["250ml", "500ml", "1L"],
        image: "/placeholder.svg"
      },
      {
        id: "organic-fungicides-technical",
        name: "Organic Fungicides Technical",
        category: "Bio Fungicides",
        categorySlug: "bio-fungicides",
        description: "Technical grade organic fungicide for formulation and direct application.",
        features: [
          "Technical grade",
          "Formulation ready",
          "Organic certified",
          "Bulk availability"
        ],
        applications: ["Formulation industry", "Organic farming"],
        dosage: "As per requirement",
        packing: ["500gm", "1Kg", "5Kg", "25Kg"],
        image: "/placeholder.svg"
      },
      {
        id: "bio-fungicides",
        name: "Bio Fungicides",
        category: "Bio Fungicides",
        categorySlug: "bio-fungicides",
        description: "General bio-fungicide for preventive and curative disease management.",
        features: [
          "Preventive action",
          "Curative support",
          "Disease management",
          "Eco-friendly"
        ],
        applications: ["All crops", "Regular spray program"],
        dosage: "2 ml per liter of water",
        packing: ["250ml", "500ml", "1L", "5L"],
        image: "/placeholder.svg"
      }
    ]
  },
  {
    name: "Organic Fertilizers",
    slug: "organic-fertilizers",
    icon: "Droplets",
    description: "Premium organic fertilizers for sustainable and healthy crop production.",
    products: [
      {
        id: "remino-gold-organic-fertilizer",
        name: "Remino Gold Organic Fertilizer",
        category: "Organic Fertilizers",
        categorySlug: "organic-fertilizers",
        description: "Gold standard organic fertilizer with balanced nutrition for premium crops.",
        features: [
          "Balanced nutrition",
          "Premium formulation",
          "Organic certified",
          "Soil health improvement"
        ],
        applications: ["Premium crops", "Organic farming", "Export quality"],
        dosage: "3-5 kg per acre",
        packing: ["1Kg", "5Kg", "25Kg", "50Kg"],
        image: "/placeholder.svg"
      },
      {
        id: "humic-amino-shiny-ball-fertilizer",
        name: "Humic Amino Shiny Ball Organic Fertilizer",
        category: "Organic Fertilizers",
        categorySlug: "organic-fertilizers",
        description: "Unique shiny ball fertilizer combining humic acid and amino acids.",
        features: [
          "Unique formulation",
          "Slow release",
          "Soil conditioning",
          "Complete nutrition"
        ],
        applications: ["All crops", "Long-term soil improvement"],
        dosage: "4-6 kg per acre",
        packing: ["1Kg", "5Kg", "25Kg"],
        image: "/placeholder.svg"
      }
    ]
  },
  {
    name: "Organic Pesticides",
    slug: "organic-pesticides",
    icon: "Bug",
    description: "Certified organic pesticides for pest control in organic farming systems.",
    products: [
      {
        id: "roopper-organic-pesticides",
        name: "Roopper Organic Pesticides",
        category: "Organic Pesticides",
        categorySlug: "organic-pesticides",
        description: "Premium organic pesticide for effective pest control in organic farms.",
        features: [
          "Organic certified",
          "Effective pest control",
          "Safe for environment",
          "No chemical residue"
        ],
        applications: ["Organic farms", "Export crops", "Sustainable farming"],
        dosage: "2-3 ml per liter of water",
        packing: ["250ml", "500ml", "1L", "5L"],
        image: "/placeholder.svg"
      },
      {
        id: "remand-organic-pesticides",
        name: "Remand Organic Pesticides",
        category: "Organic Pesticides",
        categorySlug: "organic-pesticides",
        description: "Demanding performance organic pesticide for tough pest situations.",
        features: [
          "High performance",
          "Tough pest control",
          "Organic formula",
          "Reliable results"
        ],
        applications: ["Severe infestations", "Organic farming"],
        dosage: "3-4 ml per liter of water",
        packing: ["250ml", "500ml", "1L"],
        image: "/placeholder.svg"
      },
      {
        id: "raftaar-organic-pesticides",
        name: "Raftaar Organic Pesticides",
        category: "Organic Pesticides",
        categorySlug: "organic-pesticides",
        description: "Fast-acting organic pesticide for quick pest knockdown.",
        features: [
          "Fast acting",
          "Quick knockdown",
          "Organic formula",
          "Safe application"
        ],
        applications: ["Emergency control", "Quick response"],
        dosage: "2 ml per liter of water",
        packing: ["100ml", "250ml", "500ml", "1L"],
        image: "/placeholder.svg"
      },
      {
        id: "revex-pesticides",
        name: "Revex Pesticides",
        category: "Organic Pesticides",
        categorySlug: "organic-pesticides",
        description: "Revolutionary organic pesticide with advanced bio-technology.",
        features: [
          "Advanced bio-tech",
          "Revolutionary formula",
          "Superior efficacy",
          "Eco-friendly"
        ],
        applications: ["Modern farming", "High-tech agriculture"],
        dosage: "1-2 ml per liter of water",
        packing: ["100ml", "250ml", "500ml"],
        image: "/placeholder.svg"
      },
      {
        id: "bph-organic-pesticides",
        name: "BPH Organic Pesticides",
        category: "Organic Pesticides",
        categorySlug: "organic-pesticides",
        description: "Specialized organic pesticide for Brown Plant Hopper control in rice.",
        features: [
          "BPH specialist",
          "Rice crop focus",
          "Organic solution",
          "Effective control"
        ],
        applications: ["Rice", "Paddy", "Wetland crops"],
        dosage: "2-3 ml per liter of water",
        packing: ["250ml", "500ml", "1L"],
        image: "/placeholder.svg"
      }
    ]
  },
  {
    name: "Potassium Humate",
    slug: "potassium-humate",
    icon: "FlaskConical",
    description: "Premium potassium humate products for soil conditioning and plant nutrition.",
    products: [
      {
        id: "potassium-humate",
        name: "Potassium Humate",
        category: "Potassium Humate",
        categorySlug: "potassium-humate",
        description: "High-quality potassium humate for soil health and nutrient availability.",
        features: [
          "Soil conditioning",
          "Nutrient availability",
          "Root development",
          "Water retention"
        ],
        applications: ["All crops", "Soil improvement", "Fertigation"],
        dosage: "1-2 kg per acre",
        composition: "Potassium Humate 90%",
        packing: ["500gm", "1Kg", "5Kg", "25Kg"],
        image: "/placeholder.svg"
      },
      {
        id: "super-potassium-humate-shiny-flakes",
        name: "Super Potassium Humate Shiny Flakes",
        category: "Potassium Humate",
        categorySlug: "potassium-humate",
        description: "Premium shiny flakes of super potassium humate for superior results.",
        features: [
          "Shiny flake form",
          "Super concentration",
          "Easy dissolution",
          "Premium quality"
        ],
        applications: ["Foliar spray", "Fertigation", "Soil drench"],
        dosage: "0.5-1 kg per acre",
        composition: "Super Potassium Humate 98%",
        packing: ["500gm", "1Kg", "5Kg"],
        image: "/placeholder.svg"
      }
    ]
  },
  {
    name: "Seaweed Extract Flake",
    slug: "seaweed-extract",
    icon: "Leaf",
    description: "Natural seaweed extracts rich in plant growth hormones and trace elements.",
    products: [
      {
        id: "seaweed-extracts",
        name: "Seaweed Extracts",
        category: "Seaweed Extract Flake",
        categorySlug: "seaweed-extract",
        description: "Pure seaweed extract powder for natural plant growth promotion.",
        features: [
          "Natural hormones",
          "Trace elements",
          "Stress tolerance",
          "Growth promotion"
        ],
        applications: ["All crops", "Organic farming", "Stress management"],
        dosage: "1-2 gm per liter of water",
        composition: "Seaweed Extract 100%",
        packing: ["250gm", "500gm", "1Kg", "5Kg"],
        image: "/placeholder.svg"
      },
      {
        id: "seaweed-extract-solution",
        name: "Seaweed Extract Solution",
        category: "Seaweed Extract Flake",
        categorySlug: "seaweed-extract",
        description: "Ready-to-use seaweed extract solution for easy application.",
        features: [
          "Ready to use",
          "Easy application",
          "Consistent concentration",
          "Quick absorption"
        ],
        applications: ["Foliar spray", "Drip irrigation", "All crops"],
        dosage: "2-3 ml per liter of water",
        packing: ["250ml", "500ml", "1L", "5L"],
        image: "/placeholder.svg"
      }
    ]
  },
  {
    name: "Virus Controller",
    slug: "virus-controller",
    icon: "Shield",
    description: "Specialized products for managing viral diseases in crops.",
    products: [
      {
        id: "recolate-virus-controller",
        name: "Recolate Virus Controller",
        category: "Virus Controller",
        categorySlug: "virus-controller",
        description: "Advanced virus controller for managing viral infections in crops.",
        features: [
          "Virus management",
          "Plant immunity boost",
          "Disease resistance",
          "Recovery support"
        ],
        applications: ["Viral infected crops", "Prevention spray"],
        dosage: "2-3 ml per liter of water",
        packing: ["100ml", "250ml", "500ml", "1L"],
        image: "/placeholder.svg"
      },
      {
        id: "virucide-virus-controller",
        name: "Virucide Virus Controller",
        category: "Virus Controller",
        categorySlug: "virus-controller",
        description: "Virucidal formulation for effective virus control and plant protection.",
        features: [
          "Virucidal action",
          "Plant protection",
          "Systemic movement",
          "Long protection"
        ],
        applications: ["Tomato", "Chilli", "Papaya", "Vegetables"],
        dosage: "2 ml per liter of water",
        packing: ["100ml", "250ml", "500ml", "1L"],
        image: "/placeholder.svg"
      }
    ]
  },
  {
    name: "Insecticides Formulation",
    slug: "insecticides-formulation",
    icon: "Bug",
    description: "Advanced insecticide formulations for comprehensive pest management.",
    products: [
      {
        id: "roaming-insecticides",
        name: "Roaming Insecticides",
        category: "Insecticides Formulation",
        categorySlug: "insecticides-formulation",
        description: "Broad-spectrum insecticide for roaming and flying pest control.",
        features: [
          "Flying pest control",
          "Roaming insects",
          "Broad spectrum",
          "Quick action"
        ],
        applications: ["All crops", "Field crops", "Orchards"],
        dosage: "2 ml per liter of water",
        packing: ["250ml", "500ml", "1L", "5L"],
        image: "/placeholder.svg"
      },
      {
        id: "natural-insect-repellent",
        name: "Natural Insect Repellent",
        category: "Insecticides Formulation",
        categorySlug: "insecticides-formulation",
        description: "Natural insect repellent for organic and sustainable pest management.",
        features: [
          "Natural formula",
          "Repellent action",
          "Organic compatible",
          "Safe for beneficials"
        ],
        applications: ["Organic farms", "Integrated pest management"],
        dosage: "3-4 ml per liter of water",
        packing: ["250ml", "500ml", "1L"],
        image: "/placeholder.svg"
      },
      {
        id: "insecticide-formulations",
        name: "Insecticide Formulations",
        category: "Insecticides Formulation",
        categorySlug: "insecticides-formulation",
        description: "Professional-grade insecticide formulations for commercial farming.",
        features: [
          "Professional grade",
          "Commercial use",
          "Effective control",
          "Economic application"
        ],
        applications: ["Commercial farms", "Large-scale agriculture"],
        dosage: "As per recommendation",
        packing: ["500ml", "1L", "5L", "20L"],
        image: "/placeholder.svg"
      },
      {
        id: "herbal-insect-repellents",
        name: "Herbal Insect Repellents",
        category: "Insecticides Formulation",
        categorySlug: "insecticides-formulation",
        description: "100% herbal insect repellent made from botanical extracts.",
        features: [
          "100% herbal",
          "Botanical extracts",
          "Eco-friendly",
          "Safe for humans"
        ],
        applications: ["Organic farming", "Home gardens", "Safe zones"],
        dosage: "3-5 ml per liter of water",
        packing: ["100ml", "250ml", "500ml", "1L"],
        image: "/placeholder.svg"
      }
    ]
  },
  {
    name: "Bio Larvicide",
    slug: "bio-larvicide",
    icon: "Shield",
    description: "Biological larvicides for effective larvae control in agricultural and aquatic environments.",
    products: [
      {
        id: "larvicide-insecticide",
        name: "Larvicide Insecticide",
        category: "Bio Larvicide",
        categorySlug: "bio-larvicide",
        description: "Dual-action larvicide and insecticide for complete pest life cycle control.",
        features: [
          "Life cycle control",
          "Larvae targeting",
          "Insect control",
          "Complete protection"
        ],
        applications: ["Rice", "Vegetables", "Fruit crops"],
        dosage: "2 ml per liter of water",
        packing: ["250ml", "500ml", "1L"],
        image: "/placeholder.svg"
      },
      {
        id: "rdx-super-larvicide",
        name: "RDX Super Larvicide",
        category: "Bio Larvicide",
        categorySlug: "bio-larvicide",
        description: "Super concentrated bio-larvicide for severe larval infestation control.",
        features: [
          "Super concentrated",
          "Severe infestation",
          "Bio-based",
          "Quick action"
        ],
        applications: ["Heavy infestation", "Aquatic larvae", "Mosquito control"],
        dosage: "1 ml per liter of water",
        packing: ["100ml", "250ml", "500ml"],
        image: "/placeholder.svg"
      }
    ]
  },
  {
    name: "Plant Growth Promoter",
    slug: "plant-growth-promoter",
    icon: "Sprout",
    description: "Specialized plant growth promoters for enhanced vegetative and reproductive development.",
    products: [
      {
        id: "plant-growth-promoters",
        name: "Plant Growth Promoters",
        category: "Plant Growth Promoter",
        categorySlug: "plant-growth-promoter",
        description: "General plant growth promoter for overall plant development enhancement.",
        features: [
          "Overall development",
          "Vegetative growth",
          "Root development",
          "Balanced nutrition"
        ],
        applications: ["All crops", "Nurseries", "Greenhouses"],
        dosage: "2 ml per liter of water",
        packing: ["250ml", "500ml", "1L", "5L"],
        image: "/placeholder.svg"
      },
      {
        id: "retonic-pgs",
        name: "Retonic Plant Growth Stimulant",
        category: "Plant Growth Promoter",
        categorySlug: "plant-growth-promoter",
        description: "Tonic-like growth stimulant for rejuvenating stressed or weak plants.",
        features: [
          "Plant tonic",
          "Stress recovery",
          "Rejuvenation",
          "Vigor restoration"
        ],
        applications: ["Stressed plants", "Recovery phase", "Transplant support"],
        dosage: "2-3 ml per liter of water",
        packing: ["250ml", "500ml", "1L"],
        image: "/placeholder.svg"
      },
      {
        id: "rowdy-pgp-pgp",
        name: "Rowdy Plant Growth Promoter",
        category: "Plant Growth Promoter",
        categorySlug: "plant-growth-promoter",
        description: "Aggressive growth promoter for maximum vegetative development.",
        features: [
          "Aggressive growth",
          "Maximum development",
          "Early establishment",
          "Strong plants"
        ],
        applications: ["Early stage crops", "Transplants", "Quick establishment"],
        dosage: "2-3 ml per liter of water",
        packing: ["250ml", "500ml", "1L"],
        image: "/placeholder.svg"
      }
    ]
  },
  {
    name: "Soil Conditioners",
    slug: "soil-conditioners",
    icon: "Droplets",
    description: "Premium soil conditioners for improving soil structure, fertility, and health.",
    products: [
      {
        id: "soil-conditioner",
        name: "Soil Conditioner",
        category: "Soil Conditioners",
        categorySlug: "soil-conditioners",
        description: "General soil conditioner for improving soil physical and chemical properties.",
        features: [
          "Soil structure",
          "Water retention",
          "Nutrient availability",
          "Microbial activity"
        ],
        applications: ["All soils", "Degraded lands", "Intensive farming"],
        dosage: "5-10 kg per acre",
        packing: ["5Kg", "10Kg", "25Kg", "50Kg"],
        image: "/placeholder.svg"
      },
      {
        id: "soil-conditioner-granule",
        name: "Soil Conditioner Granule",
        category: "Soil Conditioners",
        categorySlug: "soil-conditioners",
        description: "Granular soil conditioner for easy application and slow release.",
        features: [
          "Granular form",
          "Easy application",
          "Slow release",
          "Long-lasting effect"
        ],
        applications: ["Field crops", "Orchards", "Plantations"],
        dosage: "8-12 kg per acre",
        packing: ["5Kg", "10Kg", "25Kg"],
        image: "/placeholder.svg"
      },
      {
        id: "amino-shiny-ball",
        name: "Amino Shiny Ball",
        category: "Soil Conditioners",
        categorySlug: "soil-conditioners",
        description: "Unique amino acid enriched shiny ball soil conditioner.",
        features: [
          "Amino acid enriched",
          "Unique formulation",
          "Soil and plant benefit",
          "Dual action"
        ],
        applications: ["All crops", "Soil improvement", "Plant nutrition"],
        dosage: "3-5 kg per acre",
        packing: ["1Kg", "5Kg", "25Kg"],
        image: "/placeholder.svg"
      }
    ]
  },
  {
    name: "Viricide Agro Chemicals",
    slug: "viricide-agro-chemicals",
    icon: "Shield",
    description: "Specialized viricide formulations for comprehensive viral disease management.",
    products: [
      {
        id: "mickey-virus-controller",
        name: "Mickey Virus Controller",
        category: "Viricide Agro Chemicals",
        categorySlug: "viricide-agro-chemicals",
        description: "Powerful virus controller for managing severe viral diseases in crops.",
        features: [
          "Severe virus control",
          "Powerful formula",
          "Quick action",
          "Plant recovery"
        ],
        applications: ["Viral diseases", "Infected crops", "Prevention"],
        dosage: "2-3 ml per liter of water",
        packing: ["100ml", "250ml", "500ml", "1L"],
        image: "/placeholder.svg"
      },
      {
        id: "recolate-viricide",
        name: "Recolate Viricide",
        category: "Viricide Agro Chemicals",
        categorySlug: "viricide-agro-chemicals",
        description: "Advanced viricide for controlling and preventing viral infections.",
        features: [
          "Virus prevention",
          "Infection control",
          "Systemic action",
          "Long protection"
        ],
        applications: ["Prevention spray", "Infected areas", "High-risk crops"],
        dosage: "2 ml per liter of water",
        packing: ["100ml", "250ml", "500ml", "1L"],
        image: "/placeholder.svg"
      }
    ]
  },
  {
    name: "Spread and Activator",
    slug: "spread-and-activator",
    icon: "Droplets",
    description: "Spreaders and activators for improved pesticide and nutrient absorption.",
    products: [
      {
        id: "silicon-super-spreader",
        name: "Silicon Based Super Spreader",
        category: "Spread and Activator",
        categorySlug: "spread-and-activator",
        description: "Silicon-based super spreader for superior coverage and penetration.",
        features: [
          "Silicon based",
          "Super spreading",
          "Better coverage",
          "Enhanced penetration"
        ],
        applications: ["All spray applications", "Pesticides", "Foliar nutrients"],
        dosage: "0.5-1 ml per liter of water",
        composition: "Organosilicone compound",
        packing: ["100ml", "250ml", "500ml", "1L"],
        image: "/placeholder.svg"
      },
      {
        id: "resil-gold-spreader",
        name: "Resil Gold Spreader and Activator",
        category: "Spread and Activator",
        categorySlug: "spread-and-activator",
        description: "Premium gold-grade spreader and activator for maximum spray efficiency.",
        features: [
          "Premium quality",
          "Spreading action",
          "Activator function",
          "Maximum efficiency"
        ],
        applications: ["Premium applications", "High-value crops"],
        dosage: "0.25-0.5 ml per liter of water",
        packing: ["100ml", "250ml", "500ml"],
        image: "/placeholder.svg"
      }
    ]
  },
  {
    name: "Bio Fertilizer",
    slug: "bio-fertilizer",
    icon: "Leaf",
    description: "Living microorganism-based fertilizers for sustainable nutrient management.",
    products: [
      {
        id: "mycorrhiza-bio-fertilizer",
        name: "Mycorrhiza Bio Fertilizer",
        category: "Bio Fertilizer",
        categorySlug: "bio-fertilizer",
        description: "Mycorrhizal fungi-based bio-fertilizer for enhanced nutrient uptake.",
        features: [
          "Mycorrhizal fungi",
          "Enhanced uptake",
          "Root colonization",
          "Phosphorus availability"
        ],
        applications: ["All crops", "Nurseries", "Transplants"],
        dosage: "2-3 kg per acre",
        composition: "Mycorrhiza spores",
        packing: ["500gm", "1Kg", "5Kg", "25Kg"],
        image: "/placeholder.svg"
      },
      {
        id: "bio-organic-zyme-granules",
        name: "Bio Organic Zyme Granules",
        category: "Bio Fertilizer",
        categorySlug: "bio-fertilizer",
        description: "Enzyme-enriched organic granules for soil biological activity enhancement.",
        features: [
          "Enzyme enriched",
          "Biological activity",
          "Organic matter",
          "Soil health"
        ],
        applications: ["Soil application", "All crops", "Organic farming"],
        dosage: "5-8 kg per acre",
        packing: ["5Kg", "10Kg", "25Kg"],
        image: "/placeholder.svg"
      }
    ]
  },
  {
    name: "Absorbent Polymer",
    slug: "absorbent-polymer",
    icon: "Droplets",
    description: "Water-absorbing polymers for improved water management in agriculture.",
    products: [
      {
        id: "water-absorbent-polymer",
        name: "Water Absorbent Polymer",
        category: "Absorbent Polymer",
        categorySlug: "absorbent-polymer",
        description: "Agricultural-grade water-absorbing polymer for moisture retention.",
        features: [
          "Water absorption",
          "Moisture retention",
          "Drought protection",
          "Reduced irrigation"
        ],
        applications: ["Dry regions", "Water-scarce areas", "Container plants"],
        dosage: "2-3 kg per acre",
        packing: ["500gm", "1Kg", "5Kg", "25Kg"],
        image: "/placeholder.svg"
      },
      {
        id: "super-absorbent-polymer",
        name: "Super Absorbent Polymer",
        category: "Absorbent Polymer",
        categorySlug: "absorbent-polymer",
        description: "Super absorbent polymer for maximum water holding capacity.",
        features: [
          "Super absorption",
          "Maximum holding",
          "Long-lasting effect",
          "Premium quality"
        ],
        applications: ["Extreme drought", "Nurseries", "High-value crops"],
        dosage: "1-2 kg per acre",
        packing: ["250gm", "500gm", "1Kg", "5Kg"],
        image: "/placeholder.svg"
      }
    ]
  }
];

// Helper function to get all products as flat array
export const getAllProducts = (): Product[] => {
  return productCategories.flatMap(category => category.products);
};

// Helper function to get product by ID
export const getProductById = (id: string): Product | undefined => {
  return getAllProducts().find(product => product.id === id);
};

// Helper function to get category by slug
export const getCategoryBySlug = (slug: string): ProductCategory | undefined => {
  return productCategories.find(category => category.slug === slug);
};

// Helper function to get products by category slug
export const getProductsByCategory = (categorySlug: string): Product[] => {
  const category = getCategoryBySlug(categorySlug);
  return category?.products || [];
};
