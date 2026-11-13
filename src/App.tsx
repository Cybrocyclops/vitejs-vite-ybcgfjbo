import React, { useState, useMemo, useEffect } from 'react';
import {
  Utensils,
  Wallet,
  Calendar as CalendarIcon,
  MessageSquare,
  ShieldCheck,
  PieChart,
  Plus,
  CheckCircle2,
  AlertCircle,
  Clock,
  Flame,
  Sparkles,
  Download,
  RefreshCw,
  ShoppingBag,
  Users,
  BookOpen,
  ChevronRight,
  Trash2,
  Filter,
  Send,
  GraduationCap,
  HeartPulse,
  Store,
  Leaf,
  Check,
  X,
  Sun,
  Moon,
  Globe,
  Layers
} from 'lucide-react';

// --- INITIAL REALISTIC TU DELFT STUDENT & TA DATA ---
const INITIAL_MEAL_LOGS = [
  {
    id: 'm1',
    day: 'Mon',
    date: 'Nov 9',
    name: 'Overnight Oats with Skyr & Chia',
    mealType: 'Breakfast',
    calories: 440,
    protein: 28,
    carbs: 54,
    fat: 11,
    cost: 1.15,
    tags: ['Vegetarian', 'Shared-Kitchen Friendly', 'Microbial Rennet']
  },
  {
    id: 'm2',
    day: 'Mon',
    date: 'Nov 9',
    name: '1-Pot Red Lentil & Spinach Dal with Rice',
    mealType: 'Dinner',
    calories: 680,
    protein: 29,
    carbs: 108,
    fat: 14,
    cost: 1.65,
    tags: ['Vegan', 'Halal', 'Gluten-Free', '1-Pot']
  },
  {
    id: 'm3',
    day: 'Tue',
    date: 'Nov 10',
    name: 'Masala Egg Bhurji & Whole-Wheat Wraps',
    mealType: 'Lunch',
    calories: 560,
    protein: 32,
    carbs: 48,
    fat: 24,
    cost: 1.85,
    tags: ['Eggetarian', 'Halal', '<20 Mins']
  },
  {
    id: 'm4',
    day: 'Wed',
    date: 'Nov 11',
    name: 'Crispy Tofu & Peanut Udon Stir-Fry',
    mealType: 'Dinner',
    calories: 710,
    protein: 34,
    carbs: 82,
    fat: 26,
    cost: 2.35,
    tags: ['Vegan', '<20 Mins', '1-Pot']
  },
  {
    id: 'm5',
    day: 'Thu',
    date: 'Nov 12',
    name: 'High-Protein Cottage Cheese & Avocado Toast + 2 Eggs',
    mealType: 'Breakfast',
    calories: 520,
    protein: 31,
    carbs: 38,
    fat: 25,
    cost: 1.90,
    tags: ['Eggetarian', 'Microbial Rennet', '<20 Mins']
  },
  {
    id: 'm6',
    day: 'Thu',
    date: 'Nov 12',
    name: 'Chickpea & Roasted Bell Pepper Couscous Bowl',
    mealType: 'Lunch',
    calories: 610,
    protein: 24,
    carbs: 89,
    fat: 16,
    cost: 1.75,
    tags: ['Vegan', 'Halal', '<20 Mins']
  },
  {
    id: 'm7',
    day: 'Thu',
    date: 'Nov 12',
    name: 'Shakshuka with Feta (Microbial Rennet) & Pita',
    mealType: 'Dinner',
    calories: 540,
    protein: 28,
    carbs: 52,
    fat: 22,
    cost: 2.10,
    tags: ['Eggetarian', 'Halal', '1-Pot', 'Microbial Rennet']
  }
];

const WEEKLY_TREND_DATA = [
  { day: 'Mon', calories: 2050, target: 2200, protein: 112, cost: 5.40 },
  { day: 'Tue', calories: 2180, target: 2200, protein: 124, cost: 6.10 },
  { day: 'Wed', calories: 1990, target: 2200, protein: 108, cost: 5.85 },
  { day: 'Thu', calories: 1670, target: 2200, protein: 83, cost: 5.75 },
  { day: 'Fri', calories: 0, target: 2200, protein: 0, cost: 0 },
  { day: 'Sat', calories: 0, target: 2200, protein: 0, cost: 0 },
  { day: 'Sun', calories: 0, target: 2200, protein: 0, cost: 0 }
];

const RECIPE_DATABASE = [
  {
    id: 'r1',
    title: '15-Min Spinach & Chickpea Masala Skillet',
    prepTime: 15,
    onePot: true,
    calories: 580,
    protein: 26,
    carbs: 78,
    fat: 16,
    costPerPortion: 1.55,
    servings: 3,
    store: 'Lidl Delft / AH',
    dietary: {
      vegetarian: true,
      eggetarian: true,
      vegan: true,
      halal: true,
      glutenFree: true,
      lactoseFree: true,
      nutFree: true,
      microbialRennet: true,
      noMeatDerivatives: true,
      lowPrep: true
    },
    ingredients: ['1 can chickpeas (€0.89)', '200g fresh spinach (€1.29)', '1 can diced tomatoes (€0.75)', 'Rice & cumin seeds (€0.95)', 'Garlic & ginger paste (€0.75)'],
    zeroWasteTip: 'Uses half a bag of spinach—pair the remaining 200g with Friday morning scrambled eggs or smoothie!'
  },
  {
    id: 'r2',
    title: 'High-Protein Green Pesto Shakshuka & Pita',
    prepTime: 18,
    onePot: true,
    calories: 620,
    protein: 34,
    carbs: 48,
    fat: 29,
    costPerPortion: 2.10,
    servings: 2,
    store: 'Albert Heijn Bonus',
    dietary: {
      vegetarian: false,
      eggetarian: true,
      vegan: false,
      halal: true,
      glutenFree: false,
      lactoseFree: false,
      nutFree: true,
      microbialRennet: true,
      noMeatDerivatives: true,
      lowPrep: true
    },
    ingredients: ['4 free-range eggs (€1.40)', '200g spinach & courgette (€1.45)', '75g AH White Feta - Microbial Rennet verified (€0.95)', '2 whole-wheat pitas (€0.40)'],
    zeroWasteTip: 'Verified vegetarian feta (no animal rennet) + zero-waste herb stems blended into the base.'
  },
  {
    id: 'r3',
    title: 'Smoky Black Bean, Corn & Sweet Potato Quesadillas',
    prepTime: 20,
    onePot: true,
    calories: 650,
    protein: 25,
    carbs: 84,
    fat: 21,
    costPerPortion: 1.80,
    servings: 4,
    store: 'Jumbo Bastiaansplein',
    dietary: {
      vegetarian: true,
      eggetarian: true,
      vegan: false,
      halal: true,
      glutenFree: false,
      lactoseFree: false,
      nutFree: true,
      microbialRennet: true,
      noMeatDerivatives: true,
      lowPrep: true
    },
    ingredients: ['1 can black beans (€0.99)', '150g sweetcorn (€0.79)', '1 large sweet potato, diced (€0.85)', 'Whole-wheat tortillas (€1.39)', 'Gouda Jonge Kaas - Vegetarian Rennet (€1.85)'],
    zeroWasteTip: 'Freeze 2 extra pre-folded quesadillas in foil for instant 4-minute exam-week pan-toasting.'
  },
  {
    id: 'r4',
    title: 'Silken Tofu & Edamame Sesame Rice Bowl',
    prepTime: 12,
    onePot: true,
    calories: 590,
    protein: 31,
    carbs: 68,
    fat: 19,
    costPerPortion: 1.95,
    servings: 2,
    store: 'Amazing Oriental / Lidl',
    dietary: {
      vegetarian: true,
      eggetarian: true,
      vegan: true,
      halal: true,
      glutenFree: true,
      lactoseFree: true,
      nutFree: true,
      microbialRennet: true,
      noMeatDerivatives: true,
      lowPrep: true
    },
    ingredients: ['300g tofu block (€1.49)', '150g frozen edamame beans (€1.10)', 'Jasmine rice (€0.60)', 'Tamari GF soy sauce & sesame oil (€0.70)'],
    zeroWasteTip: '100% shelf/freezer stable ingredients—zero risk of fresh produce spoiling during busy lab weeks.'
  },
  {
    id: 'r5',
    title: 'Creamy Coconut Red Lentil & Roasted Cauliflower Curry',
    prepTime: 28,
    onePot: true,
    calories: 690,
    protein: 27,
    carbs: 92,
    fat: 22,
    costPerPortion: 1.45,
    servings: 4,
    store: 'Lidl Delft',
    dietary: {
      vegetarian: true,
      eggetarian: true,
      vegan: true,
      halal: true,
      glutenFree: true,
      lactoseFree: true,
      nutFree: true,
      microbialRennet: true,
      noMeatDerivatives: true,
      lowPrep: false
    },
    ingredients: ['250g dried red lentils (€0.85)', '1 coconut milk tin (€0.99)', 'Half cauliflower head (€1.15)', 'Basmati rice & curry powder (€1.20)'],
    zeroWasteTip: 'Chop and roast the cauliflower leaves & core alongside the florets for extra fiber and 0% trim waste!'
  },
  {
    id: 'r6',
    title: 'Mediterranean Lactose-Free Halloumi & Quinoa Salad',
    prepTime: 15,
    onePot: true,
    calories: 610,
    protein: 29,
    carbs: 56,
    fat: 28,
    costPerPortion: 2.65,
    servings: 2,
    store: 'Albert Heijn XL',
    dietary: {
      vegetarian: true,
      eggetarian: true,
      vegan: false,
      halal: true,
      glutenFree: true,
      lactoseFree: true,
      nutFree: true,
      microbialRennet: true,
      noMeatDerivatives: true,
      lowPrep: true
    },
    ingredients: ['200g Vegetarian Halloumi w/ lactase (€2.49)', '150g Tricolor Quinoa (€1.20)', 'Cherry tomatoes & cucumber (€1.15)', 'Olive oil & lemon dressing (€0.45)'],
    zeroWasteTip: 'Quinoa keeps for 4 days in the fridge—ideal cold packed lunch for EWI / Pulse study spaces without microwave queues.'
  }
];

const INITIAL_GROCERY_ITEMS = [
  { id: 'g1', item: 'Lidl Fresh Spinach (400g)', store: 'Lidl', price: 1.59, portions: 3, category: 'Produce', sharedIngredient: true },
  { id: 'g2', item: 'Free-Range Eggs (10 pack)', store: 'Albert Heijn', price: 3.29, portions: 5, category: 'Protein', sharedIngredient: true },
  { id: 'g3', item: 'Dried Red Lentils (1kg Bulk)', store: 'Amazing Oriental', price: 2.89, portions: 10, category: 'Pantry', sharedIngredient: true },
  { id: 'g4', item: 'Organic Firm Tofu (2x 325g)', store: 'Albert Heijn', price: 2.98, portions: 4, category: 'Protein', sharedIngredient: false },
  { id: 'g5', item: 'Skyr High-Protein Yogurt (2x 500g)', store: 'Lidl', price: 3.18, portions: 5, category: 'Dairy', sharedIngredient: false },
  { id: 'g6', item: 'Whole-Wheat Tortilla Wraps & Pitas', store: 'Jumbo', price: 2.45, portions: 6, category: 'Bakery', sharedIngredient: true },
  { id: 'g7', item: 'Canned Chickpeas, Black Beans & Tomatoes (6 tins)', store: 'Lidl', price: 5.10, portions: 6, category: 'Pantry', sharedIngredient: true },
  { id: 'g8', item: 'Basmati Rice, Oats & Spices Refill', store: 'Jumbo', price: 6.95, portions: 12, category: 'Pantry', sharedIngredient: true },
  { id: 'g9', item: 'Avocados, Bell Peppers & Sweet Potatoes', store: 'Lidl', price: 4.85, portions: 5, category: 'Produce', sharedIngredient: true }
];

const INITIAL_CALENDAR_EVENTS = [
  { id: 'c1', day: 'Mon', time: '08:45 - 10:30', title: 'CSE1100: OOP Lecture & Lab Prep', type: 'academic', location: 'Echo Arena' },
  { id: 'c2', day: 'Mon', time: '12:30 - 13:15', title: 'Packed Lunch: Red Lentil Dal Box', type: 'meal', location: 'Pulse Hall (No Microwave Needed)' },
  { id: 'c3', day: 'Mon', time: '18:00 - 18:45', title: 'Batch Prep: Lentil Dal & Overnight Oats (4 Portions)', type: 'prep', location: 'Student Dorm Kitchen' },
  { id: 'c4', day: 'Tue', time: '10:45 - 12:30', title: 'TA Duty: CSE1300 Lab Supervision & Grading', type: 'ta', location: 'EWI Building (HB)' },
  { id: 'c5', day: 'Tue', time: '13:00 - 13:20', title: 'Quick Lunch: 15-Min Masala Egg Bhurji Wraps', type: 'prep', location: 'Home Kitchen' },
  { id: 'c6', day: 'Wed', time: '14:00 - 17:00', title: 'HAIP Group 1 Project Sprint (D1 Review)', type: 'academic', location: 'TU Delft Library' },
  { id: 'c7', day: 'Wed', time: '18:30 - 18:50', title: '1-Pot Prep: Crispy Tofu & Peanut Udon', type: 'prep', location: 'Student Dorm Kitchen' },
  { id: 'c8', day: 'Thu', time: '08:45 - 10:30', title: 'CSE1300: Algorithm Design Lecture', type: 'academic', location: 'Aula Congress Centre' },
  { id: 'c9', day: 'Thu', time: '13:30 - 17:30', title: 'CSE1400: TA Office Hours & Code Reviews', type: 'ta', location: 'Drebbelweg PC Hall' },
  { id: 'c10', day: 'Thu', time: '18:15 - 18:40', title: 'Dinner Prep: Green Pesto Shakshuka (2 Portions)', type: 'prep', location: 'Student Dorm Kitchen' },
  { id: 'c11', day: 'Fri', time: '11:00 - 13:00', title: 'Exam Prep Block: Computer Organization (CSE1400)', type: 'academic', location: 'TU Delft Library' },
  { id: 'c12', day: 'Sun', time: '17:00 - 18:00', title: 'Weekly Sunday Batch Prep & Lidl Grocery Run', type: 'prep', location: 'Lidl Delft + Kitchen' }
];

const TEAM_MEMBERS = [
  {
    name: 'Mansimran Kaur',
    studentNo: '6731090',
    role: 'Management & Strategy',
    secondaryRole: 'Project Coordination & Sprint Governance',
    department: 'BSc Computer Science and Engineering (CSE)',
    focus: 'Oversees overall project direction, milestone scheduling, and internal task allocation across all deliverable phases.',
    lightBadge: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    darkBadge: 'bg-emerald-950/80 text-emerald-300 border-emerald-800/70'
  },
  {
    name: 'Vivaan Patsaria',
    studentNo: '6704093',
    role: 'Sales & Outreach',
    secondaryRole: 'User Outreach & Engagement',
    department: 'BSc Computer Science and Engineering (CSE)',
    focus: 'Leads external communication with student test participants, coordinates feedback sessions, and validates practical student/TA adoption.',
    lightBadge: 'bg-teal-100 text-teal-800 border-teal-200',
    darkBadge: 'bg-teal-950/80 text-teal-300 border-teal-800/70'
  },
  {
    name: 'Dhanmeet Kaur',
    studentNo: '6686648',
    role: 'Marketing & Communications',
    secondaryRole: 'Interface Content & UX Storytelling',
    department: 'BSc Computer Science and Engineering (CSE)',
    focus: 'Manages user-facing copy, interface clarity, onboarding flows, and presentation materials for project demonstrations.',
    lightBadge: 'bg-amber-100 text-amber-800 border-amber-200',
    darkBadge: 'bg-amber-950/80 text-amber-300 border-amber-800/70'
  },
  {
    name: 'Aditi Juyal',
    studentNo: '6660398',
    role: 'Research & Development',
    secondaryRole: 'User Research & Requirements Engineering',
    department: 'BSc Computer Science and Engineering (CSE)',
    focus: 'Leads functional specification synthesis, dietary/allergen constraint logic (including microbial rennet verification), and AI feature evaluation.',
    lightBadge: 'bg-cyan-100 text-cyan-800 border-cyan-200',
    darkBadge: 'bg-cyan-950/80 text-cyan-300 border-cyan-800/70'
  }
];

const COMPETENCY_MATRIX = [
  { area: 'Project Management & Planning', primary: 'Mansimran Kaur (6731090)', backup: 'Vivaan Patsaria (6704093)' },
  { area: 'User Research & Requirements', primary: 'Aditi Juyal (6660398)', backup: 'Dhanmeet Kaur (6686648)' },
  { area: 'UI/UX Prototyping & Content', primary: 'Dhanmeet Kaur (6686648)', backup: 'Mansimran Kaur (6731090)' },
  { area: 'Participant Testing & Outreach', primary: 'Vivaan Patsaria (6704093)', backup: 'Aditi Juyal (6660398)' }
];

export default function App() {
  // Dark Mode State (Defaults to sleek Dark Mode, persisted in localStorage)
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem('unibite_theme_dark');
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('unibite_theme_dark', JSON.stringify(darkMode));
    } catch {
      // Ignore storage errors in restricted environments
    }
  }, [darkMode]);

  const [activeTab, setActiveTab] = useState('dashboard');
  const [weeklyBudgetLimit, setWeeklyBudgetLimit] = useState(50.0);

  // Module 1 State: Nutrition & Calorie Tracker
  const [mealLogs, setMealLogs] = useState(INITIAL_MEAL_LOGS);
  const [newMeal, setNewMeal] = useState({
    name: '',
    mealType: 'Dinner',
    calories: 550,
    protein: 28,
    carbs: 65,
    fat: 18,
    cost: 1.85
  });

  // Module 2 State: Dietary & Allergen Engine
  const [dietaryFilters, setDietaryFilters] = useState({
    vegetarian: false,
    eggetarian: true,
    vegan: false,
    halal: false,
    glutenFree: false,
    lactoseFree: false,
    nutFree: true,
    microbialRennet: true,
    noMeatDerivatives: true,
    lowPrep: true
  });

  // Module 3 State: Conversational AI Culinary & Budget Assistant
  const [chatMessages, setChatMessages] = useState([
    {
      role: 'assistant',
      text: "Hoi! I'm your UniBite AI Culinary & Budget Assistant. Tell me what leftovers are in your student fridge, how much time you have between lectures/TA duties, and your remaining € budget. I automatically respect your active dietary constraints (Eggetarian, Microbial Rennet Verified, Nut-Free)!",
      recipeCard: {
        title: '12-Min Spinach, Egg & Garlic Fried Rice (1-Wok)',
        cost: '€1.35 / portion',
        time: '12 mins',
        macros: '540 kcal • 26g Protein • 64g Carbs • 18g Fat',
        steps: [
          'Sauté garlic & leftover spinach stems in 1 tsp oil for 2 mins.',
          'Push to the side, scramble 3 eggs directly in the pan with turmeric & black pepper.',
          'Toss in cooked rice, remaining spinach leaves, and a splash of soy sauce until wilted.'
        ]
      }
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  // Module 4 State: Calendar-Synced Meal Planner
  const [calendarEvents, setCalendarEvents] = useState(INITIAL_CALENDAR_EVENTS);
  const [calendarSynced, setCalendarSynced] = useState(true);
  const [newCalendarSlot, setNewCalendarSlot] = useState({
    day: 'Fri',
    time: '18:00 - 18:30',
    title: '15-Min Spinach & Chickpea Skillet Prep',
    type: 'prep',
    location: 'Student Dorm Kitchen'
  });
  const [icsExportNotice, setIcsExportNotice] = useState(false);

  // Module 5 State: Grocery Expense & Portion Tracker
  const [groceryItems, setGroceryItems] = useState(INITIAL_GROCERY_ITEMS);
  const [newGrocery, setNewGrocery] = useState({
    item: '',
    store: 'Lidl',
    price: '',
    portions: 4,
    category: 'Produce'
  });

  // --- DERIVED METRICS ---
  const totalWeeklySpent = useMemo(() => {
    return groceryItems.reduce((acc, item) => acc + Number(item.price), 0);
  }, [groceryItems]);

  const totalPortionsYielded = useMemo(() => {
    return groceryItems.reduce((acc, item) => acc + Number(item.portions), 0);
  }, [groceryItems]);

  const avgCostPerPortion = useMemo(() => {
    return totalPortionsYielded > 0 ? totalWeeklySpent / totalPortionsYielded : 0;
  }, [totalWeeklySpent, totalPortionsYielded]);

  const todayMeals = useMemo(() => {
    return mealLogs.filter((m) => m.day === 'Thu');
  }, [mealLogs]);

  const todayMacros = useMemo(() => {
    return todayMeals.reduce(
      (acc, m) => ({
        calories: acc.calories + Number(m.calories),
        protein: acc.protein + Number(m.protein),
        carbs: acc.carbs + Number(m.carbs),
        fat: acc.fat + Number(m.fat),
        cost: acc.cost + Number(m.cost)
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0, cost: 0 }
    );
  }, [todayMeals]);

  const filteredRecipes = useMemo(() => {
    return RECIPE_DATABASE.filter((r) => {
      if (dietaryFilters.vegetarian && !r.dietary.vegetarian) return false;
      if (dietaryFilters.eggetarian && !r.dietary.eggetarian) return false;
      if (dietaryFilters.vegan && !r.dietary.vegan) return false;
      if (dietaryFilters.halal && !r.dietary.halal) return false;
      if (dietaryFilters.glutenFree && !r.dietary.glutenFree) return false;
      if (dietaryFilters.lactoseFree && !r.dietary.lactoseFree) return false;
      if (dietaryFilters.nutFree && !r.dietary.nutFree) return false;
      if (dietaryFilters.microbialRennet && !r.dietary.microbialRennet) return false;
      if (dietaryFilters.noMeatDerivatives && !r.dietary.noMeatDerivatives) return false;
      if (dietaryFilters.lowPrep && !r.dietary.lowPrep) return false;
      return true;
    });
  }, [dietaryFilters]);

  // --- HANDLERS ---
  const handleAddMealLog = (e) => {
    e.preventDefault();
    if (!newMeal.name.trim()) return;
    const created = {
      id: `m-${Date.now()}`,
      day: 'Thu',
      date: 'Nov 12',
      name: newMeal.name,
      mealType: newMeal.mealType,
      calories: Number(newMeal.calories) || 450,
      protein: Number(newMeal.protein) || 20,
      carbs: Number(newMeal.carbs) || 50,
      fat: Number(newMeal.fat) || 15,
      cost: Number(newMeal.cost) || 1.75,
      tags: ['Logged Today', 'Custom Entry']
    };
    setMealLogs([created, ...mealLogs]);
    setNewMeal({ name: '', mealType: 'Snack', calories: 320, protein: 18, carbs: 35, fat: 10, cost: 1.10 });
  };

  const quickLogRecipe = (recipe) => {
    const created = {
      id: `m-${Date.now()}`,
      day: 'Thu',
      date: 'Nov 12',
      name: recipe.title,
      mealType: 'Dinner',
      calories: recipe.calories,
      protein: recipe.protein,
      carbs: recipe.carbs,
      fat: recipe.fat,
      cost: recipe.costPerPortion,
      tags: ['MOD-02 Verified', `${recipe.prepTime}m Prep`]
    };
    setMealLogs([created, ...mealLogs]);
    setActiveTab('mod1');
  };

  const toggleFilter = (key) => {
    setDietaryFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Gemini API + Smart Fallback for MOD-03 Conversational Assistant
  const handleSendChat = async (customPrompt) => {
    const queryText = customPrompt || chatInput;
    if (!queryText.trim() || isGeneratingAI) return;

    const userMsg = { role: 'user', text: queryText };
    setChatMessages((prev) => [...prev, userMsg]);
    if (!customPrompt) setChatInput('');
    setIsGeneratingAI(true);

    const activeConstraintNames = Object.entries(dietaryFilters)
      .filter(([, val]) => val)
      .map(([k]) => k)
      .join(', ');

    const systemInstruction = `You are UniBite AI, a smart culinary, nutrition, and budget assistant for TU Delft university students and Teaching Assistants.
Active user dietary constraints: ${activeConstraintNames || 'Eggetarian, Microbial Rennet only'}.
Remaining weekly grocery budget: €${(weeklyBudgetLimit - totalWeeklySpent).toFixed(2)}.
Respond with a friendly, concise message tailored to a busy student in Delft (mentioning Dutch supermarkets like Lidl/Albert Heijn/Jumbo prices in Euros, 1-pot shared-kitchen tips, and zero-waste overlap).`;

    let aiReplyText = '';
    let generatedCard = null;

    try {
      const apiKey = '';
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;
      const payload = {
        contents: [{ parts: [{ text: queryText }] }],
        systemInstruction: { parts: [{ text: systemInstruction }] },
        generationConfig: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: 'OBJECT',
            properties: {
              reply: { type: 'STRING' },
              recipeTitle: { type: 'STRING' },
              costPerPortion: { type: 'STRING' },
              prepTime: { type: 'STRING' },
              macros: { type: 'STRING' },
              steps: {
                type: 'ARRAY',
                items: { type: 'STRING' }
              }
            },
            propertyOrdering: ['reply', 'recipeTitle', 'costPerPortion', 'prepTime', 'macros', 'steps']
          }
        }
      };

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const result = await response.json();
        const rawJson = result?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (rawJson) {
          const parsed = JSON.parse(rawJson);
          aiReplyText = parsed.reply;
          generatedCard = {
            title: parsed.recipeTitle,
            cost: parsed.costPerPortion,
            time: parsed.prepTime,
            macros: parsed.macros,
            steps: parsed.steps || []
          };
        }
      }
    } catch (e) {
      // Fallback handled cleanly below if offline or no runtime key injected
    }

    if (!aiReplyText) {
      const lower = queryText.toLowerCase();
      if (lower.includes('egg') || lower.includes('spinach') || lower.includes('15 min')) {
        aiReplyText =
          "Perfect between-lecture fuel! Since you already have eggs, spinach, and rice in your pantry, you only need €0.40 worth of aromatics. This 1-pan meal takes 12 minutes, respects your Eggetarian & Microbial-Rennet rules, and leaves plenty of your €" +
          (weeklyBudgetLimit - totalWeeklySpent).toFixed(2) +
          ' remaining budget intact.';
        generatedCard = {
          title: '12-Min Golden Turmeric Egg & Spinach Skillet Rice',
          cost: '€1.25 / portion (Uses Pantry Items)',
          time: '12 mins (1-Pot)',
          macros: '560 kcal • 29g Protein • 62g Carbs • 19g Fat',
          steps: [
            'Heat 1 tbsp oil in a single skillet; bloom cumin, garlic, and finely chopped spinach stems for 2 mins.',
            'Crack 3 eggs directly into the center, scrambling softly until 80% set.',
            'Fold in 1 cup cooked rice and 2 handfuls of fresh spinach until wilted. Top with black pepper or vegetarian feta!'
          ]
        };
      } else if (lower.includes('exam') || lower.includes('batch') || lower.includes('prep')) {
        aiReplyText =
          'For heavy exam and TA grading weeks, I recommend a 1-pot batch cook that stores in 4 airtight containers and can be eaten warm or cold on campus at Pulse/Library without waiting in microwave queues:';
        generatedCard = {
          title: 'Batch-Prep Smoky Lentil, Chickpea & Sweet Potato Chili',
          cost: '€1.40 / portion (4 Portions = €5.60 total at Lidl)',
          time: '20 mins active',
          macros: '610 kcal • 28g Protein • 88g Carbs • 12g Fat',
          steps: [
            'Dice 1 large sweet potato into 1cm cubes so it boils tender in just 10 minutes.',
            'Simmer in 1 pot with 1 tin chickpeas, 150g red lentils, 1 tin crushed tomatoes, and smoked paprika.',
            'Portion into 4 containers—save the leftover cilantro & lime for Thursday wraps!'
          ]
        };
      } else {
        aiReplyText = `I've tailored a high-protein, student-budget recipe matching your active filters (${activeConstraintNames || 'Eggetarian, Low-Prep'}) using ingredients from Lidl/Albert Heijn Delft:`;
        generatedCard = {
          title: '15-Min Crispy Halloumi (Microbial Rennet) & Black Bean Wraps',
          cost: '€1.95 / portion',
          time: '15 mins (1-Pan)',
          macros: '590 kcal • 32g Protein • 58g Carbs • 23g Fat',
          steps: [
            'Pan-sear sliced vegetarian halloumi and spiced black beans in 1 skillet for 6 minutes.',
            'Toss in diced bell pepper and spinach to wilt in the residual heat.',
            'Wrap tightly in whole-wheat tortillas and toast seam-side down for 1 minute.'
          ]
        };
      }
    }

    setChatMessages((prev) => [
      ...prev,
      {
        role: 'assistant',
        text: aiReplyText,
        recipeCard: generatedCard
      }
    ]);
    setIsGeneratingAI(false);
  };

  const handleAddCalendarSlot = (e) => {
    e.preventDefault();
    if (!newCalendarSlot.title.trim()) return;
    setCalendarEvents((prev) => [
      ...prev,
      {
        id: `c-${Date.now()}`,
        ...newCalendarSlot
      }
    ]);
    setNewCalendarSlot({
      day: 'Sat',
      time: '17:30 - 18:00',
      title: '',
      type: 'prep',
      location: 'Student Dorm Kitchen'
    });
  };

  const handleExportICS = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//TU Delft HAIP Group 1//UniBite Smart Meal Planner//EN',
      'BEGIN:VEVENT',
      'SUMMARY:UniBite Batch Prep: Lentil Dal & Overnight Oats (4 Portions)',
      'DESCRIPTION:Synced from UniBite MOD-04. Estimated cost: €1.65/portion.',
      'LOCATION:Student Dorm Kitchen',
      'DTSTART:20261112T181500Z',
      'DTEND:20261112T184500Z',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'UniBite_TUDelft_MealPlan.ics';
    a.click();
    URL.revokeObjectURL(url);
    setIcsExportNotice(true);
    setTimeout(() => setIcsExportNotice(false), 4000);
  };

  const handleAddGrocery = (e) => {
    e.preventDefault();
    if (!newGrocery.item.trim() || !newGrocery.price) return;
    setGroceryItems((prev) => [
      {
        id: `g-${Date.now()}`,
        item: newGrocery.item,
        store: newGrocery.store,
        price: parseFloat(newGrocery.price) || 2.0,
        portions: parseInt(newGrocery.portions, 10) || 4,
        category: newGrocery.category,
        sharedIngredient: true
      },
      ...prev
    ]);
    setNewGrocery({ item: '', store: 'Lidl', price: '', portions: 4, category: 'Produce' });
  };

  const handleDeleteGrocery = (id) => {
    setGroceryItems((prev) => prev.filter((item) => item.id !== id));
  };

  // --- THEME TOKENS (DARK & LIGHT MODE) ---
  const t = {
    pageBg: darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900',
    headerBg: darkMode
      ? 'bg-slate-900/95 border-slate-800 shadow-lg shadow-black/20'
      : 'bg-white/95 border-emerald-100 shadow-xs',
    subNavBg: darkMode ? 'bg-slate-950/90 border-slate-800/90' : 'bg-slate-100/70 border-slate-200/80',
    card: darkMode
      ? 'bg-slate-900 border-slate-800 text-slate-100 shadow-lg shadow-black/20'
      : 'bg-white border-slate-200 text-slate-900 shadow-xs',
    subCard: darkMode
      ? 'bg-slate-800/60 border-slate-700/80 text-slate-200'
      : 'bg-slate-50 border-slate-200/80 text-slate-800',
    input: darkMode
      ? 'bg-slate-800 border-slate-700 text-slate-100 placeholder-slate-400 focus:border-emerald-500'
      : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-emerald-600',
    heading: darkMode ? 'text-white' : 'text-slate-900',
    subText: darkMode ? 'text-slate-400' : 'text-slate-500',
    bodyText: darkMode ? 'text-slate-300' : 'text-slate-600',
    divider: darkMode ? 'border-slate-800' : 'border-slate-100',
    progressTrack: darkMode ? 'bg-slate-800' : 'bg-slate-200'
  };

  const navItems = [
    { id: 'dashboard', label: 'Overview', icon: PieChart, badge: null },
    { id: 'mod1', label: 'MOD-01: Nutrition', icon: Flame, badge: 'AI Tracker' },
    { id: 'mod2', label: 'MOD-02: Dietary Engine', icon: ShieldCheck, badge: `${filteredRecipes.length} Matches` },
    { id: 'mod3', label: 'MOD-03: AI Chef Chat', icon: MessageSquare, badge: 'Live LLM' },
    { id: 'mod4', label: 'MOD-04: Calendar Sync', icon: CalendarIcon, badge: 'iCal/GCal' },
    { id: 'mod5', label: 'MOD-05: Budget & Waste', icon: Wallet, badge: `€${totalWeeklySpent.toFixed(2)}` },
    { id: 'd1spec', label: 'About D1 & Team', icon: Users, badge: 'Group 1' }
  ];

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${t.pageBg}`}>
      {/* Top Header Bar */}
      <header className={`sticky top-0 z-30 backdrop-blur border-b transition-colors duration-300 ${t.headerBg}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md shadow-emerald-900/20">
              <Utensils className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`font-bold text-lg tracking-tight ${t.heading}`}>UniBite</span>
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${
                    darkMode
                      ? 'bg-emerald-950/90 text-emerald-300 border-emerald-800'
                      : 'bg-emerald-100 text-emerald-800 border-emerald-200'
                  }`}
                >
                  TU Delft • HAIP Group 1
                </span>
              </div>
              <p className={`text-xs hidden sm:block ${t.subText}`}>
                Smart Meal-Planning, Nutrition & Portion-Budget Platform for Students & TAs
              </p>
            </div>
          </div>

          {/* Quick Live Status Pills + Dark Mode Toggle */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            <button
              onClick={() => setActiveTab('mod5')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition text-xs font-medium ${
                darkMode
                  ? 'bg-emerald-950/60 hover:bg-emerald-900/70 border-emerald-800/80 text-emerald-200'
                  : 'bg-emerald-50 hover:bg-emerald-100 border-emerald-200 text-emerald-900'
              }`}
            >
              <Wallet className="w-3.5 h-3.5 text-emerald-500" />
              <span>
                €{totalWeeklySpent.toFixed(2)} / €{weeklyBudgetLimit.toFixed(0)}
              </span>
              <span className={`hidden md:inline font-semibold ${darkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>
                (€{avgCostPerPortion.toFixed(2)}/meal)
              </span>
            </button>

            <button
              onClick={() => setActiveTab('mod1')}
              className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl border transition text-xs font-medium ${
                darkMode
                  ? 'bg-amber-950/60 hover:bg-amber-900/70 border-amber-800/80 text-amber-200'
                  : 'bg-amber-50 hover:bg-amber-100 border-amber-200 text-amber-900'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              <span>{todayMacros.calories} / 2,200 kcal</span>
            </button>

            <button
              onClick={() => setActiveTab('d1spec')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition hidden md:flex items-center gap-1.5 ${
                activeTab === 'd1spec'
                  ? 'bg-emerald-600 text-white border-emerald-500'
                  : darkMode
                  ? 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <GraduationCap className="w-4 h-4 text-emerald-400" />
              <span>D1 Spec & Team</span>
            </button>

            {/* Dark / Light Mode Toggle Button */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              aria-label="Toggle Dark or Light Mode"
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                darkMode
                  ? 'bg-slate-800 hover:bg-slate-700 text-amber-300 border-slate-700 shadow-inner'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
              }`}
            >
              {darkMode ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span className="hidden sm:inline">Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-slate-700" />
                  <span className="hidden sm:inline">Dark</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Navigation Bar */}
        <div className={`border-t transition-colors duration-300 ${t.subNavBg}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1.5 overflow-x-auto py-2 no-scrollbar">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-950/50'
                      : darkMode
                      ? 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/80'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
                  }`}
                >
                  <IconComponent className={`w-4 h-4 ${isActive ? 'text-white' : 'text-emerald-500'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-md font-semibold ${
                        isActive
                          ? 'bg-emerald-800 text-emerald-100'
                          : darkMode
                          ? 'bg-slate-800 text-slate-300 border border-slate-700'
                          : 'bg-slate-200/80 text-slate-700'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* ================= 1. OVERVIEW DASHBOARD ================= */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Hero Banner */}
            <div
              className={`rounded-2xl p-6 text-white shadow-md relative overflow-hidden border ${
                darkMode
                  ? 'bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-900 border-emerald-800/60'
                  : 'bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 border-emerald-700'
              }`}
            >
              <div className="max-w-3xl space-y-2 relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs text-xs font-medium text-emerald-200 border border-white/10">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Active Student Profile: CSE Student & TA (Delft) • Eggetarian + Microbial Rennet Verified</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  Good afternoon! Your Thursday dinner prep takes 15 mins & costs €2.10.
                </h1>
                <p className="text-emerald-100/90 text-sm sm:text-base">
                  You have a 4-hour CSE1400 TA Office Hours block until 17:30. UniBite scheduled a 25-minute 1-pot Shakshuka slot at 18:15 using spinach and eggs already in your fridge.
                </p>
                <div className="pt-2 flex flex-wrap gap-3">
                  <button
                    onClick={() => setActiveTab('mod3')}
                    className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold text-xs sm:text-sm flex items-center gap-2 transition shadow-xs cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Ask AI Chef What to Cook Tonight
                  </button>
                  <button
                    onClick={() => setActiveTab('mod2')}
                    className="px-4 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white font-medium text-xs sm:text-sm flex items-center gap-2 transition cursor-pointer"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    Inspect Dietary & Allergen Engine
                  </button>
                </div>
              </div>
            </div>

            {/* 4 Key Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Budget Card */}
              <div className={`rounded-2xl p-5 border flex flex-col justify-between transition-colors ${t.card}`}>
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-semibold uppercase tracking-wider ${t.subText}`}>
                    Weekly Grocery Budget
                  </span>
                  <div
                    className={`p-2 rounded-lg ${
                      darkMode ? 'bg-emerald-950 text-emerald-400' : 'bg-emerald-50 text-emerald-600'
                    }`}
                  >
                    <Wallet className="w-5 h-5" />
                  </div>
                </div>
                <div className="my-3">
                  <div className="flex items-baseline gap-2">
                    <span className={`text-2xl font-bold ${t.heading}`}>€{totalWeeklySpent.toFixed(2)}</span>
                    <span className={`text-sm ${t.subText}`}>/ €{weeklyBudgetLimit.toFixed(2)}</span>
                  </div>
                  <div className={`w-full h-2.5 rounded-full mt-2 overflow-hidden ${t.progressTrack}`}>
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all"
                      style={{ width: `${Math.min(100, (totalWeeklySpent / weeklyBudgetLimit) * 100)}%` }}
                    />
                  </div>
                </div>
                <div className={`flex items-center justify-between text-xs pt-2 border-t ${t.divider} ${t.bodyText}`}>
                  <span>Avg Portion Cost:</span>
                  <span className={`font-bold ${darkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>
                    €{avgCostPerPortion.toFixed(2)} / meal
                  </span>
                </div>
              </div>

              {/* Calorie & Macro Card */}
              <div className={`rounded-2xl p-5 border flex flex-col justify-between transition-colors ${t.card}`}>
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-semibold uppercase tracking-wider ${t.subText}`}>
                    Daily Nutrition (Thu)
                  </span>
                  <div
                    className={`p-2 rounded-lg ${
                      darkMode ? 'bg-amber-950 text-amber-400' : 'bg-amber-50 text-amber-600'
                    }`}
                  >
                    <Flame className="w-5 h-5" />
                  </div>
                </div>
                <div className="my-3">
                  <div className="flex items-baseline gap-2">
                    <span className={`text-2xl font-bold ${t.heading}`}>{todayMacros.calories}</span>
                    <span className={`text-sm ${t.subText}`}>/ 2,200 kcal</span>
                  </div>
                  <div className={`w-full h-2.5 rounded-full mt-2 overflow-hidden ${t.progressTrack}`}>
                    <div
                      className="h-full bg-amber-500 rounded-full transition-all"
                      style={{ width: `${Math.min(100, (todayMacros.calories / 2200) * 100)}%` }}
                    />
                  </div>
                </div>
                <div className={`flex items-center justify-between text-xs pt-2 border-t ${t.divider} ${t.bodyText}`}>
                  <span>Protein: {todayMacros.protein}g / 110g</span>
                  <span className={`font-semibold ${darkMode ? 'text-amber-400' : 'text-amber-700'}`}>
                    Carbs: {todayMacros.carbs}g
                  </span>
                </div>
              </div>

              {/* Next Calendar Prep Block */}
              <div className={`rounded-2xl p-5 border flex flex-col justify-between transition-colors ${t.card}`}>
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-semibold uppercase tracking-wider ${t.subText}`}>
                    Next Synced Prep Slot
                  </span>
                  <div
                    className={`p-2 rounded-lg ${
                      darkMode ? 'bg-teal-950 text-teal-400' : 'bg-teal-50 text-teal-600'
                    }`}
                  >
                    <CalendarIcon className="w-5 h-5" />
                  </div>
                </div>
                <div className="my-3">
                  <p className={`text-sm font-bold ${t.heading}`}>18:15 – 18:40 (Today)</p>
                  <p className={`text-xs mt-0.5 ${t.bodyText}`}>
                    Green Pesto Shakshuka (2 Portions) • Right after Drebbelweg TA Office Hours
                  </p>
                </div>
                <div className={`flex items-center justify-between text-xs pt-2 border-t ${t.divider}`}>
                  <span
                    className={`inline-flex items-center gap-1 font-medium ${
                      darkMode ? 'text-emerald-400' : 'text-emerald-700'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" /> Google & Apple Cal Synced
                  </span>
                  <button
                    onClick={() => setActiveTab('mod4')}
                    className={`hover:underline font-semibold cursor-pointer ${
                      darkMode ? 'text-teal-400' : 'text-teal-700'
                    }`}
                  >
                    View Grid
                  </button>
                </div>
              </div>

              {/* AI Zero-Waste & Portion Tip */}
              <div
                className={`rounded-2xl p-5 border flex flex-col justify-between transition-colors ${
                  darkMode
                    ? 'bg-gradient-to-br from-amber-950/60 to-orange-950/40 border-amber-800/70'
                    : 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200/80'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-bold uppercase tracking-wider ${
                      darkMode ? 'text-amber-300' : 'text-amber-800'
                    }`}
                  >
                    AI Waste-Reduction Alert
                  </span>
                  <div
                    className={`p-2 rounded-lg ${
                      darkMode ? 'bg-amber-900/60 text-amber-300' : 'bg-amber-100 text-amber-700'
                    }`}
                  >
                    <Leaf className="w-5 h-5" />
                  </div>
                </div>
                <p className={`text-xs my-2 leading-relaxed ${darkMode ? 'text-amber-100/90' : 'text-amber-950'}`}>
                  <strong>Ingredient Overlap Detected:</strong> You have <strong>200g Lidl Spinach</strong> &{' '}
                  <strong>4 Eggs</strong> expiring in 48h. Using both in tonight’s Shakshuka saves{' '}
                  <strong>€2.75</strong> in avoided food waste!
                </p>
                <button
                  onClick={() => {
                    setActiveTab('mod3');
                    handleSendChat(
                      'Give me a 15-min recipe to use up my remaining 200g spinach and 4 eggs before they expire.'
                    );
                  }}
                  className={`text-xs font-bold flex items-center gap-1 pt-1 cursor-pointer ${
                    darkMode ? 'text-amber-300 hover:text-amber-200' : 'text-amber-900 hover:text-amber-700'
                  }`}
                >
                  <span>Generate Rescue Recipe</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Interactive Module Launcher Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Today's Logged Meals Preview */}
              <div className={`lg:col-span-2 rounded-2xl border p-5 transition-colors ${t.card}`}>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className={`text-base font-bold ${t.heading}`}>Today’s Logged Student Meals (Thursday)</h2>
                    <p className={`text-xs ${t.subText}`}>
                      Synced with MOD-01 Nutrition Tracker & MOD-05 Portion Expense Ledger
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('mod1')}
                    className={`px-3 py-1.5 rounded-xl font-semibold text-xs transition cursor-pointer ${
                      darkMode
                        ? 'bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-800'
                        : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700'
                    }`}
                  >
                    + Log Meal
                  </button>
                </div>

                <div className="space-y-3">
                  {todayMeals.map((meal) => (
                    <div
                      key={meal.id}
                      className={`p-3.5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${t.subCard}`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[11px] font-bold uppercase px-2 py-0.5 rounded-md ${
                              darkMode ? 'bg-emerald-950 text-emerald-300' : 'bg-emerald-100 text-emerald-800'
                            }`}
                          >
                            {meal.mealType}
                          </span>
                          <h3 className={`font-semibold text-sm ${t.heading}`}>{meal.name}</h3>
                        </div>
                        <div className="flex flex-wrap gap-1.5 pt-0.5">
                          {meal.tags.map((tag, i) => (
                            <span
                              key={i}
                              className={`text-[11px] px-2 py-0.5 rounded-full border ${
                                darkMode
                                  ? 'bg-slate-900 border-slate-700 text-slate-300'
                                  : 'bg-white border-slate-200 text-slate-600'
                              }`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div
                        className={`flex items-center gap-4 text-xs sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 ${t.divider}`}
                      >
                        <div>
                          <p className={`font-bold ${t.heading}`}>{meal.calories} kcal</p>
                          <p className={t.subText}>
                            {meal.protein}g P • {meal.carbs}g C • {meal.fat}g F
                          </p>
                        </div>
                        <div
                          className={`px-2.5 py-1.5 rounded-lg font-bold ${
                            darkMode ? 'bg-emerald-950 text-emerald-300' : 'bg-emerald-100/70 text-emerald-900'
                          }`}
                        >
                          €{meal.cost.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Active Hard Dietary Constraints Summary */}
              <div className={`rounded-2xl border p-5 flex flex-col justify-between transition-colors ${t.card}`}>
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h2 className={`text-base font-bold ${t.heading}`}>Active Dietary Safeguards</h2>
                    <ShieldCheck className="w-5 h-5 text-emerald-500" />
                  </div>
                  <p className={`text-xs mb-4 ${t.subText}`}>
                    MOD-02 enforces strict ingredient-level compliance (including hidden rennet & gelatin checks).
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {Object.entries(dietaryFilters).map(([key, isOn]) => {
                      const labels = {
                        vegetarian: 'Vegetarian',
                        eggetarian: 'Eggetarian',
                        vegan: 'Vegan',
                        halal: 'Halal',
                        glutenFree: 'Gluten-Free',
                        lactoseFree: 'Lactose-Free',
                        nutFree: 'Nut-Free',
                        microbialRennet: 'Microbial Rennet Only',
                        noMeatDerivatives: 'No Animal Broth/Gelatin',
                        lowPrep: 'Shared-Kitchen (<20m / 1-Pot)'
                      };
                      return (
                        <button
                          key={key}
                          onClick={() => toggleFilter(key)}
                          className={`text-xs px-2.5 py-1.5 rounded-xl font-medium border transition flex items-center gap-1.5 cursor-pointer ${
                            isOn
                              ? 'bg-emerald-600 text-white border-emerald-500 shadow-2xs'
                              : darkMode
                              ? 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                              : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {isOn ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3 text-slate-400" />}
                          <span>{labels[key]}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className={`p-3.5 rounded-xl border text-xs space-y-2 ${t.subCard}`}>
                  <div className="flex items-center justify-between font-semibold">
                    <span>Matching Verified Recipes:</span>
                    <span className={darkMode ? 'text-emerald-400' : 'text-emerald-700'}>
                      {filteredRecipes.length} of {RECIPE_DATABASE.length}
                    </span>
                  </div>
                  <button
                    onClick={() => setActiveTab('mod2')}
                    className={`w-full py-2 rounded-lg font-semibold transition cursor-pointer ${
                      darkMode
                        ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                        : 'bg-slate-900 hover:bg-slate-800 text-white'
                    }`}
                  >
                    Explore Filtered Student Recipes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= 2. MOD-01: AI NUTRITION & CALORIE TRACKER ================= */}
        {activeTab === 'mod1' && (
          <div className="space-y-6">
            <div className={`rounded-2xl border p-6 transition-colors ${t.card}`}>
              <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4 ${t.divider}`}>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-500">
                    MOD-01 • Core Module
                  </span>
                  <h1 className={`text-2xl font-bold ${t.heading}`}>AI Nutrition & Calorie Tracker</h1>
                  <p className={`text-sm ${t.bodyText}`}>
                    Track daily calories, macronutrients, and cost-per-portion alongside your weekly exam/TA energy targets.
                  </p>
                </div>
                <div
                  className={`flex items-center gap-3 border px-4 py-2.5 rounded-xl ${
                    darkMode
                      ? 'bg-amber-950/50 border-amber-800/70 text-amber-200'
                      : 'bg-amber-50 border-amber-200 text-amber-950'
                  }`}
                >
                  <HeartPulse className="w-5 h-5 text-amber-500 shrink-0" />
                  <div className="text-xs">
                    <p className="font-bold">Current Goal: Exam & TA Energy Maintenance</p>
                    <p className={darkMode ? 'text-amber-300/80' : 'text-amber-800'}>
                      Target: 2,200 kcal/day • 110g Protein • Max €2.20/portion
                    </p>
                  </div>
                </div>
              </div>

              {/* Macro Progress Bars for Today */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 my-6">
                <div className={`p-4 rounded-xl border ${t.subCard}`}>
                  <div className={`flex justify-between text-xs font-semibold mb-1 ${t.subText}`}>
                    <span>Calories (Today)</span>
                    <span>{Math.round((todayMacros.calories / 2200) * 100)}%</span>
                  </div>
                  <p className={`text-xl font-bold ${t.heading}`}>{todayMacros.calories} / 2,200 kcal</p>
                  <div className={`w-full h-2 rounded-full mt-2 overflow-hidden ${t.progressTrack}`}>
                    <div
                      className="h-full bg-amber-500 rounded-full"
                      style={{ width: `${Math.min(100, (todayMacros.calories / 2200) * 100)}%` }}
                    />
                  </div>
                </div>

                <div className={`p-4 rounded-xl border ${t.subCard}`}>
                  <div className={`flex justify-between text-xs font-semibold mb-1 ${t.subText}`}>
                    <span>Protein (Muscle & Focus)</span>
                    <span>{Math.round((todayMacros.protein / 110) * 100)}%</span>
                  </div>
                  <p className={`text-xl font-bold ${darkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>
                    {todayMacros.protein}g / 110g
                  </p>
                  <div className={`w-full h-2 rounded-full mt-2 overflow-hidden ${t.progressTrack}`}>
                    <div
                      className="h-full bg-emerald-500 rounded-full"
                      style={{ width: `${Math.min(100, (todayMacros.protein / 110) * 100)}%` }}
                    />
                  </div>
                </div>

                <div className={`p-4 rounded-xl border ${t.subCard}`}>
                  <div className={`flex justify-between text-xs font-semibold mb-1 ${t.subText}`}>
                    <span>Complex Carbs</span>
                    <span>{Math.round((todayMacros.carbs / 260) * 100)}%</span>
                  </div>
                  <p className={`text-xl font-bold ${darkMode ? 'text-teal-400' : 'text-teal-700'}`}>
                    {todayMacros.carbs}g / 260g
                  </p>
                  <div className={`w-full h-2 rounded-full mt-2 overflow-hidden ${t.progressTrack}`}>
                    <div
                      className="h-full bg-teal-500 rounded-full"
                      style={{ width: `${Math.min(100, (todayMacros.carbs / 260) * 100)}%` }}
                    />
                  </div>
                </div>

                <div className={`p-4 rounded-xl border ${t.subCard}`}>
                  <div className={`flex justify-between text-xs font-semibold mb-1 ${t.subText}`}>
                    <span>Healthy Fats</span>
                    <span>{Math.round((todayMacros.fat / 70) * 100)}%</span>
                  </div>
                  <p className={`text-xl font-bold ${darkMode ? 'text-cyan-400' : 'text-cyan-700'}`}>
                    {todayMacros.fat}g / 70g
                  </p>
                  <div className={`w-full h-2 rounded-full mt-2 overflow-hidden ${t.progressTrack}`}>
                    <div
                      className="h-full bg-cyan-500 rounded-full"
                      style={{ width: `${Math.min(100, (todayMacros.fat / 70) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Weekly Visual Consumption Trend & Log Form */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Weekly Bar Chart */}
                <div className={`lg:col-span-2 p-5 rounded-xl border ${t.subCard}`}>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className={`font-bold text-sm ${t.heading}`}>Weekly Calorie & Daily Food Cost Trend</h3>
                      <p className={`text-xs ${t.subText}`}>Mon Nov 9 – Sun Nov 15 • Target = 2,200 kcal/day</p>
                    </div>
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        darkMode ? 'bg-emerald-950 text-emerald-300' : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      Avg €5.78 / full day
                    </span>
                  </div>

                  <div className={`grid grid-cols-7 gap-3 items-end h-44 pt-6 px-2 border-b relative ${t.divider}`}>
                    {WEEKLY_TREND_DATA.map((item) => {
                      const displayCal = item.day === 'Thu' ? todayMacros.calories : item.calories;
                      const displayCost = item.day === 'Thu' ? todayMacros.cost : item.cost;
                      const heightPct = Math.min(100, Math.round((displayCal / 2400) * 100));
                      return (
                        <div key={item.day} className="flex flex-col items-center h-full justify-end group">
                          <span className={`text-[10px] font-bold mb-1 ${t.bodyText}`}>
                            {displayCal > 0 ? `${displayCal}` : '—'}
                          </span>
                          <div
                            className={`w-full max-w-[42px] rounded-t-lg h-32 flex items-end overflow-hidden ${
                              darkMode ? 'bg-slate-900' : 'bg-slate-200/70'
                            }`}
                          >
                            <div
                              className={`w-full rounded-t-lg transition-all ${
                                item.day === 'Thu'
                                  ? 'bg-amber-500'
                                  : displayCal > 0
                                  ? 'bg-emerald-500'
                                  : darkMode
                                  ? 'bg-slate-800'
                                  : 'bg-slate-300'
                              }`}
                              style={{ height: `${heightPct}%` }}
                            />
                          </div>
                          <span className={`text-xs font-bold mt-2 ${t.heading}`}>{item.day}</span>
                          <span
                            className={`text-[10px] font-medium mb-1 ${
                              darkMode ? 'text-emerald-400' : 'text-emerald-700'
                            }`}
                          >
                            {displayCost > 0 ? `€${displayCost.toFixed(2)}` : 'Planned'}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* AI Dietary Pattern Recommendation Card */}
                  <div
                    className={`mt-4 p-3.5 rounded-xl border flex items-start gap-3 ${
                      darkMode ? 'bg-slate-900 border-emerald-800/70' : 'bg-white border-emerald-200'
                    }`}
                  >
                    <Sparkles className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <div className="text-xs space-y-1">
                      <p className={`font-bold ${t.heading}`}>
                        AI Pattern Analysis: Post-TA Lab Protein Dip on Tuesdays & Thursdays
                      </p>
                      <p className={t.bodyText}>
                        Your logs show you need <strong>+27g protein</strong> and <strong>~530 kcal</strong> tonight to hit your 110g recovery target. Adding a 150g Skyr bowl with pumpkin seeds (€0.65) or logging a 3-egg Shakshuka closes this gap cleanly.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Log New Meal Form */}
                <form
                  onSubmit={handleAddMealLog}
                  className={`p-5 rounded-xl border space-y-3 ${
                    darkMode ? 'bg-slate-900/90 border-slate-700' : 'bg-white border-slate-200 shadow-2xs'
                  }`}
                >
                  <h3 className={`font-bold text-sm flex items-center gap-2 ${t.heading}`}>
                    <Plus className="w-4 h-4 text-emerald-500" />
                    Log Meal / Portion Entry
                  </h3>
                  <div>
                    <label className={`block text-xs font-medium mb-1 ${t.bodyText}`}>Meal Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Skyr Bowl with Walnuts & Honey"
                      value={newMeal.name}
                      onChange={(e) => setNewMeal({ ...newMeal, name: e.target.value })}
                      className={`w-full px-3 py-2 rounded-lg border text-xs focus:outline-none ${t.input}`}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className={`block text-xs font-medium mb-1 ${t.bodyText}`}>Meal Type</label>
                      <select
                        value={newMeal.mealType}
                        onChange={(e) => setNewMeal({ ...newMeal, mealType: e.target.value })}
                        className={`w-full px-2.5 py-2 rounded-lg border text-xs ${t.input}`}
                      >
                        <option>Breakfast</option>
                        <option>Lunch</option>
                        <option>Dinner</option>
                        <option>Snack</option>
                      </select>
                    </div>
                    <div>
                      <label className={`block text-xs font-medium mb-1 ${t.bodyText}`}>Portion Cost (€)</label>
                      <input
                        type="number"
                        step="0.05"
                        value={newMeal.cost}
                        onChange={(e) => setNewMeal({ ...newMeal, cost: e.target.value })}
                        className={`w-full px-2.5 py-2 rounded-lg border text-xs ${t.input}`}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className={`block text-xs font-medium mb-1 ${t.bodyText}`}>Calories (kcal)</label>
                      <input
                        type="number"
                        value={newMeal.calories}
                        onChange={(e) => setNewMeal({ ...newMeal, calories: e.target.value })}
                        className={`w-full px-2.5 py-2 rounded-lg border text-xs ${t.input}`}
                      />
                    </div>
                    <div>
                      <label className={`block text-xs font-medium mb-1 ${t.bodyText}`}>Protein (g)</label>
                      <input
                        type="number"
                        value={newMeal.protein}
                        onChange={(e) => setNewMeal({ ...newMeal, protein: e.target.value })}
                        className={`w-full px-2.5 py-2 rounded-lg border text-xs ${t.input}`}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className={`block text-xs font-medium mb-1 ${t.bodyText}`}>Carbs (g)</label>
                      <input
                        type="number"
                        value={newMeal.carbs}
                        onChange={(e) => setNewMeal({ ...newMeal, carbs: e.target.value })}
                        className={`w-full px-2.5 py-2 rounded-lg border text-xs ${t.input}`}
                      />
                    </div>
                    <div>
                      <label className={`block text-xs font-medium mb-1 ${t.bodyText}`}>Fat (g)</label>
                      <input
                        type="number"
                        value={newMeal.fat}
                        onChange={(e) => setNewMeal({ ...newMeal, fat: e.target.value })}
                        className={`w-full px-2.5 py-2 rounded-lg border text-xs ${t.input}`}
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition shadow-xs cursor-pointer"
                  >
                    Add to Today’s Nutrition Diary
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* ================= 3. MOD-02: DIETARY & ALLERGEN ENGINE ================= */}
        {activeTab === 'mod2' && (
          <div className="space-y-6">
            <div className={`rounded-2xl border p-6 transition-colors ${t.card}`}>
              <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4 ${t.divider}`}>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-500">
                    MOD-02 • Hard Constraint Filter Engine
                  </span>
                  <h1 className={`text-2xl font-bold ${t.heading}`}>
                    Dietary, Religious & Allergen Compliance Engine
                  </h1>
                  <p className={`text-sm ${t.bodyText}`}>
                    Strict ingredient-level filtering for student kitchens—including microbial rennet verification in Dutch cheeses and animal broth/gelatin exclusion.
                  </p>
                </div>
                <button
                  onClick={() =>
                    setDietaryFilters({
                      vegetarian: false,
                      eggetarian: true,
                      vegan: false,
                      halal: false,
                      glutenFree: false,
                      lactoseFree: false,
                      nutFree: false,
                      microbialRennet: true,
                      noMeatDerivatives: true,
                      lowPrep: false
                    })
                  }
                  className={`px-3.5 py-2 rounded-xl border text-xs font-semibold self-start cursor-pointer transition ${
                    darkMode
                      ? 'border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  Reset to Default Eggetarian Profile
                </button>
              </div>

              {/* Interactive Filter Toggles */}
              <div className="my-5">
                <p className={`text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-1.5 ${t.subText}`}>
                  <Filter className="w-3.5 h-3.5 text-emerald-500" />
                  Toggle Hard User Constraints (Click to Filter Recipes Instantly)
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
                  {[
                    { key: 'vegetarian', label: 'Vegetarian', sub: 'No meat, fish, or eggs' },
                    { key: 'eggetarian', label: 'Eggetarian', sub: 'Vegetarian + Eggs allowed' },
                    { key: 'vegan', label: '100% Plant-Based', sub: 'No dairy, eggs, or honey' },
                    { key: 'halal', label: 'Halal Certified', sub: 'Zero alcohol/haram extracts' },
                    { key: 'glutenFree', label: 'Gluten-Free', sub: 'Celiac/wheat-safe' },
                    { key: 'lactoseFree', label: 'Lactose-Free', sub: 'Dairy-free or lactase treated' },
                    { key: 'nutFree', label: 'Nut & Peanut Free', sub: 'Severe allergy safe' },
                    { key: 'microbialRennet', label: 'Microbial Rennet Check', sub: 'No calf-stomach cheese' },
                    { key: 'noMeatDerivatives', label: 'No Meat Derivatives', sub: 'No gelatin, lard, or stock' },
                    { key: 'lowPrep', label: 'Shared-Kitchen Mode', sub: '≤20 mins & 1-Pot only' }
                  ].map((f) => {
                    const active = dietaryFilters[f.key];
                    return (
                      <button
                        key={f.key}
                        onClick={() => toggleFilter(f.key)}
                        className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                          active
                            ? 'bg-emerald-600 text-white border-emerald-500 shadow-xs'
                            : darkMode
                            ? 'bg-slate-800/70 hover:bg-slate-800 text-slate-200 border-slate-700'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full mb-1">
                          <span className="font-bold text-xs">{f.label}</span>
                          {active ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-200 shrink-0" />
                          ) : (
                            <div
                              className={`w-4 h-4 rounded-full border shrink-0 ${
                                darkMode ? 'border-slate-600' : 'border-slate-300'
                              }`}
                            />
                          )}
                        </div>
                        <span className={`text-[11px] ${active ? 'text-emerald-100' : t.subText}`}>{f.sub}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Recipe Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
                {filteredRecipes.map((recipe) => (
                  <div
                    key={recipe.id}
                    className={`rounded-2xl border transition flex flex-col justify-between overflow-hidden ${
                      darkMode
                        ? 'bg-slate-950/60 border-slate-800 hover:border-emerald-700'
                        : 'bg-white border-slate-200 hover:border-emerald-300 shadow-2xs'
                    }`}
                  >
                    <div className="p-5 space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                            darkMode ? 'bg-emerald-950 text-emerald-300' : 'bg-emerald-100 text-emerald-900'
                          }`}
                        >
                          €{recipe.costPerPortion.toFixed(2)} / portion
                        </span>
                        <span className={`text-xs font-medium flex items-center gap-1 ${t.subText}`}>
                          <Clock className="w-3.5 h-3.5 text-amber-500" />
                          {recipe.prepTime} mins • {recipe.onePot ? '1-Pot' : '2-Pan'}
                        </span>
                      </div>

                      <h3 className={`font-bold text-base ${t.heading}`}>{recipe.title}</h3>

                      <div className={`flex items-center gap-2 text-xs px-3 py-2 rounded-lg border ${t.subCard}`}>
                        <Flame className="w-4 h-4 text-amber-500 shrink-0" />
                        <span>
                          <strong>{recipe.calories} kcal</strong> • {recipe.protein}g Protein • {recipe.carbs}g Carbs
                        </span>
                      </div>

                      {/* Compliance Badges */}
                      <div className="flex flex-wrap gap-1.5">
                        {recipe.dietary.microbialRennet && (
                          <span
                            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                              darkMode
                                ? 'bg-teal-950/80 text-teal-300 border-teal-800'
                                : 'bg-teal-50 text-teal-800 border-teal-200'
                            }`}
                          >
                            ✓ Microbial Rennet
                          </span>
                        )}
                        {recipe.dietary.vegan ? (
                          <span
                            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                              darkMode
                                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800'
                                : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            }`}
                          >
                            ✓ Vegan
                          </span>
                        ) : recipe.dietary.vegetarian ? (
                          <span
                            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                              darkMode
                                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800'
                                : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            }`}
                          >
                            ✓ Vegetarian
                          </span>
                        ) : (
                          <span
                            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                              darkMode
                                ? 'bg-amber-950/80 text-amber-300 border-amber-800'
                                : 'bg-amber-50 text-amber-800 border-amber-200'
                            }`}
                          >
                            ✓ Eggetarian
                          </span>
                        )}
                        {recipe.dietary.glutenFree && (
                          <span
                            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                              darkMode
                                ? 'bg-cyan-950/80 text-cyan-300 border-cyan-800'
                                : 'bg-cyan-50 text-cyan-800 border-cyan-200'
                            }`}
                          >
                            ✓ Gluten-Free
                          </span>
                        )}
                      </div>

                      {/* Supermarket Ingredients */}
                      <div className="space-y-1 pt-1">
                        <p className={`text-xs font-semibold flex items-center gap-1 ${t.bodyText}`}>
                          <Store className="w-3.5 h-3.5 text-emerald-500" />
                          Est. Prices at {recipe.store} ({recipe.servings} servings):
                        </p>
                        <ul className={`text-xs space-y-0.5 pl-4 list-disc ${t.subText}`}>
                          {recipe.ingredients.map((ing, i) => (
                            <li key={i}>{ing}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Zero-waste overlap note */}
                      <div
                        className={`p-2.5 rounded-lg border text-[11px] ${
                          darkMode
                            ? 'bg-amber-950/40 border-amber-800/60 text-amber-200'
                            : 'bg-amber-50/70 border-amber-200/70 text-amber-900'
                        }`}
                      >
                        <strong>Zero-Waste Tip:</strong> {recipe.zeroWasteTip}
                      </div>
                    </div>

                    <div
                      className={`p-3 border-t flex items-center justify-between gap-2 ${
                        darkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200/80'
                      }`}
                    >
                      <button
                        onClick={() => quickLogRecipe(recipe)}
                        className="flex-1 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition cursor-pointer"
                      >
                        Log Portion to MOD-01
                      </button>
                      <button
                        onClick={() => {
                          setActiveTab('mod4');
                          setNewCalendarSlot({
                            day: 'Fri',
                            time: '18:00 - 18:25',
                            title: `Prep: ${recipe.title}`,
                            type: 'prep',
                            location: 'Student Dorm Kitchen'
                          });
                        }}
                        className={`px-3 py-2 rounded-lg border font-semibold text-xs transition cursor-pointer ${
                          darkMode
                            ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                            : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        Schedule
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= 4. MOD-03: CONVERSATIONAL CULINARY & BUDGET ASSISTANT ================= */}
        {activeTab === 'mod3' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className={`lg:col-span-2 rounded-2xl border flex flex-col h-[640px] transition-colors ${t.card}`}>
              {/* Chat Header */}
              <div
                className={`p-4 border-b flex items-center justify-between rounded-t-2xl ${
                  darkMode ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className={`font-bold text-sm ${t.heading}`}>
                      MOD-03: Conversational Culinary & Budget Assistant
                    </h2>
                    <p className={`text-xs ${t.subText}`}>
                      Powered by Gemini AI • Respects your active MOD-02 constraints & €{(weeklyBudgetLimit - totalWeeklySpent).toFixed(2)} remaining budget
                    </p>
                  </div>
                </div>
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                    darkMode ? 'bg-emerald-950 text-emerald-300' : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  1-Pot / Shared-Kitchen Ready
                </span>
              </div>

              {/* Quick Prompt Chips */}
              <div
                className={`px-4 py-2.5 border-b flex items-center gap-2 overflow-x-auto no-scrollbar ${
                  darkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-100/70 border-slate-200'
                }`}
              >
                <span className={`text-[11px] font-semibold shrink-0 ${t.subText}`}>Try Prompt:</span>
                {[
                  'I have eggs, spinach, rice, €4 left, and 15 mins between lectures',
                  'Batch prep 4 exam-week lunches under €1.50/portion (no microwave needed)',
                  'High-protein vegetarian dinner from Lidl under €2.00 with microbial rennet cheese'
                ].map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendChat(prompt)}
                    className={`text-xs px-3 py-1 rounded-full border whitespace-nowrap transition cursor-pointer ${
                      darkMode
                        ? 'bg-slate-800 hover:bg-emerald-950 text-slate-300 hover:text-emerald-300 border-slate-700'
                        : 'bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border-slate-200'
                    }`}
                  >
                    “{prompt}”
                  </button>
                ))}
              </div>

              {/* Messages Container */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {chatMessages.map((msg, index) => (
                  <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm space-y-3 ${
                        msg.role === 'user'
                          ? 'bg-emerald-600 text-white'
                          : darkMode
                          ? 'bg-slate-800/90 text-slate-100 border border-slate-700'
                          : 'bg-slate-100 text-slate-800 border border-slate-200'
                      }`}
                    >
                      <p className="leading-relaxed">{msg.text}</p>

                      {msg.recipeCard && (
                        <div
                          className={`p-3.5 rounded-xl border space-y-2 ${
                            darkMode
                              ? 'bg-slate-900 text-slate-100 border-emerald-800/80'
                              : 'bg-white text-slate-900 border-emerald-200 shadow-2xs'
                          }`}
                        >
                          <div className={`flex flex-wrap items-center justify-between gap-2 border-b pb-2 ${t.divider}`}>
                            <h4 className={`font-bold text-sm ${darkMode ? 'text-emerald-300' : 'text-emerald-950'}`}>
                              {msg.recipeCard.title}
                            </h4>
                            <div className="flex items-center gap-2">
                              <span
                                className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                                  darkMode ? 'bg-emerald-950 text-emerald-300' : 'bg-emerald-100 text-emerald-800'
                                }`}
                              >
                                {msg.recipeCard.cost}
                              </span>
                              <span
                                className={`text-xs font-medium px-2 py-0.5 rounded-md ${
                                  darkMode ? 'bg-amber-950 text-amber-300' : 'bg-amber-100 text-amber-800'
                                }`}
                              >
                                {msg.recipeCard.time}
                              </span>
                            </div>
                          </div>
                          <p className={`text-xs font-semibold ${t.subText}`}>{msg.recipeCard.macros}</p>
                          <ol className={`text-xs space-y-1 list-decimal pl-4 ${t.bodyText}`}>
                            {msg.recipeCard.steps.map((step, sIdx) => (
                              <li key={sIdx}>{step}</li>
                            ))}
                          </ol>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {isGeneratingAI && (
                  <div className="flex justify-start">
                    <div className={`border rounded-2xl px-4 py-3 text-xs flex items-center gap-2 ${t.subCard}`}>
                      <RefreshCw className="w-4 h-4 animate-spin text-emerald-500" />
                      <span>Calculating Delft supermarket portion costs & checking dietary constraints...</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Input Bar */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendChat();
                }}
                className={`p-3 border-t rounded-b-2xl flex items-center gap-2 ${
                  darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                }`}
              >
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Type your leftover ingredients, prep time limit, and € budget..."
                  className={`flex-1 px-4 py-2.5 rounded-xl border text-xs sm:text-sm focus:outline-none ${t.input}`}
                />
                <button
                  type="submit"
                  disabled={isGeneratingAI}
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold text-xs sm:text-sm flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Ask AI</span>
                </button>
              </form>
            </div>

            {/* Right Context Panel: Pantry & Constraint Context */}
            <div className={`rounded-2xl border p-5 space-y-5 transition-colors ${t.card}`}>
              <div>
                <h3 className={`font-bold text-base ${t.heading}`}>Context Sent to AI Assistant</h3>
                <p className={`text-xs mt-0.5 ${t.subText}`}>
                  MOD-03 automatically injects your pantry inventory, budget ceiling, and allergen profile into every prompt.
                </p>
              </div>

              <div
                className={`p-3.5 rounded-xl border space-y-2 text-xs ${
                  darkMode
                    ? 'bg-emerald-950/50 border-emerald-800/70 text-emerald-200'
                    : 'bg-emerald-50 border-emerald-200 text-emerald-950'
                }`}
              >
                <div className="flex justify-between font-semibold">
                  <span>Remaining Weekly Budget:</span>
                  <span>€{(weeklyBudgetLimit - totalWeeklySpent).toFixed(2)}</span>
                </div>
                <div className="flex justify-between opacity-90">
                  <span>Target Portion Cost:</span>
                  <span>≤ €2.15 / meal</span>
                </div>
                <div className="flex justify-between opacity-90">
                  <span>Kitchen Setup:</span>
                  <span>Shared Student Kitchen (1-Pot preferred)</span>
                </div>
              </div>

              <div>
                <h4 className={`text-xs font-bold uppercase tracking-wider mb-2 ${t.subText}`}>
                  Current Student Fridge / Pantry Stock
                </h4>
                <div className="space-y-2">
                  {[
                    { name: '200g Fresh Spinach (Lidl)', status: 'Use within 2 days', urgent: true },
                    { name: '6 Free-Range Eggs (AH)', status: 'Fresh', urgent: false },
                    { name: '750g Dried Red Lentils', status: 'Pantry Staple', urgent: false },
                    { name: '1.2kg Basmati Rice & Oats', status: 'Pantry Staple', urgent: false },
                    { name: '1 Tin Chickpeas & 1 Tin Tomatoes', status: 'Pantry Staple', urgent: false }
                  ].map((p, i) => (
                    <div
                      key={i}
                      className={`flex items-center justify-between p-2.5 rounded-lg border text-xs ${t.subCard}`}
                    >
                      <span className="font-medium">{p.name}</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          p.urgent
                            ? darkMode
                              ? 'bg-amber-950 text-amber-300 border border-amber-800'
                              : 'bg-amber-100 text-amber-800'
                            : darkMode
                            ? 'bg-slate-700 text-slate-300'
                            : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        {p.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= 5. MOD-04: CALENDAR-SYNCED MEAL PLANNER ================= */}
        {activeTab === 'mod4' && (
          <div className="space-y-6">
            <div className={`rounded-2xl border p-6 transition-colors ${t.card}`}>
              <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4 ${t.divider}`}>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-500">
                    MOD-04 • Academic & TA Schedule Integration
                  </span>
                  <h1 className={`text-2xl font-bold ${t.heading}`}>
                    Calendar-Synced Meal Planner & Prep Scheduler
                  </h1>
                  <p className={`text-sm ${t.bodyText}`}>
                    Aligns batch cooking and 15-minute prep windows around TU Delft lectures (CSE1100, CSE1300, CSE1400), lab supervision, and exam blocks.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    onClick={() => setCalendarSynced(!calendarSynced)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold border flex items-center gap-2 transition cursor-pointer ${
                      calendarSynced
                        ? darkMode
                          ? 'bg-emerald-950/70 text-emerald-300 border-emerald-800'
                          : 'bg-emerald-50 text-emerald-800 border-emerald-300'
                        : darkMode
                        ? 'bg-slate-800 text-slate-400 border-slate-700'
                        : 'bg-slate-100 text-slate-600 border-slate-300'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>{calendarSynced ? 'Google & Apple Calendar Synced' : 'Click to Enable Calendar Sync'}</span>
                  </button>

                  <button
                    onClick={handleExportICS}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                      darkMode
                        ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                        : 'bg-slate-900 hover:bg-slate-800 text-white'
                    }`}
                  >
                    <Download className="w-4 h-4" />
                    <span>Export .ICS Calendar</span>
                  </button>
                </div>
              </div>

              {icsExportNotice && (
                <div
                  className={`mt-4 p-3 rounded-xl border text-xs flex items-center justify-between ${
                    darkMode
                      ? 'bg-emerald-950/70 border-emerald-800 text-emerald-200'
                      : 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  }`}
                >
                  <span>
                    ✓ <strong>UniBite_TUDelft_MealPlan.ics</strong> downloaded! You can import your meal prep blocks directly into Google Calendar, Outlook, or Apple Calendar.
                  </span>
                </div>
              )}

              {/* Weekly Schedule Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3 my-6">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sun'].map((day) => {
                  const dayEvents = calendarEvents.filter((e) => e.day === day);
                  return (
                    <div
                      key={day}
                      className={`rounded-xl border p-3 flex flex-col justify-between ${
                        day === 'Thu'
                          ? darkMode
                            ? 'bg-emerald-950/30 border-emerald-700'
                            : 'bg-emerald-50/40 border-emerald-300'
                          : t.subCard
                      }`}
                    >
                      <div>
                        <div className={`flex items-center justify-between border-b pb-2 mb-2.5 ${t.divider}`}>
                          <span className={`font-bold text-sm ${t.heading}`}>{day}</span>
                          {day === 'Thu' && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-600 text-white">
                              TODAY
                            </span>
                          )}
                        </div>

                        <div className="space-y-2">
                          {dayEvents.map((ev) => {
                            const badgeStyle =
                              ev.type === 'prep'
                                ? darkMode
                                  ? 'bg-emerald-950/90 border-emerald-800 text-emerald-200'
                                  : 'bg-emerald-100 border-emerald-300 text-emerald-950'
                                : ev.type === 'ta'
                                ? darkMode
                                  ? 'bg-amber-950/90 border-amber-800 text-amber-200'
                                  : 'bg-amber-100 border-amber-300 text-amber-950'
                                : ev.type === 'meal'
                                ? darkMode
                                  ? 'bg-teal-950/90 border-teal-800 text-teal-200'
                                  : 'bg-teal-100 border-teal-300 text-teal-950'
                                : darkMode
                                ? 'bg-slate-900 border-slate-700 text-slate-200'
                                : 'bg-white border-slate-200 text-slate-800';
                            return (
                              <div key={ev.id} className={`p-2.5 rounded-lg border text-xs space-y-1 ${badgeStyle}`}>
                                <p className="font-bold text-[10px] opacity-75">{ev.time}</p>
                                <p className="font-semibold leading-snug">{ev.title}</p>
                                <p className="text-[10px] opacity-80">{ev.location}</p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Add New Prep Slot Form */}
              <form
                onSubmit={handleAddCalendarSlot}
                className={`p-4 rounded-xl border flex flex-col sm:flex-row items-end gap-3 ${t.subCard}`}
              >
                <div className="w-full sm:w-28">
                  <label className={`block text-xs font-semibold mb-1 ${t.bodyText}`}>Day</label>
                  <select
                    value={newCalendarSlot.day}
                    onChange={(e) => setNewCalendarSlot({ ...newCalendarSlot, day: e.target.value })}
                    className={`w-full px-3 py-2 rounded-lg border text-xs ${t.input}`}
                  >
                    <option>Mon</option>
                    <option>Tue</option>
                    <option>Wed</option>
                    <option>Thu</option>
                    <option>Fri</option>
                    <option>Sun</option>
                  </select>
                </div>
                <div className="w-full sm:w-40">
                  <label className={`block text-xs font-semibold mb-1 ${t.bodyText}`}>Time Window</label>
                  <input
                    type="text"
                    value={newCalendarSlot.time}
                    onChange={(e) => setNewCalendarSlot({ ...newCalendarSlot, time: e.target.value })}
                    placeholder="18:00 - 18:30"
                    className={`w-full px-3 py-2 rounded-lg border text-xs ${t.input}`}
                  />
                </div>
                <div className="flex-1 w-full">
                  <label className={`block text-xs font-semibold mb-1 ${t.bodyText}`}>
                    Meal Prep or Packed Lunch Activity
                  </label>
                  <input
                    type="text"
                    required
                    value={newCalendarSlot.title}
                    onChange={(e) => setNewCalendarSlot({ ...newCalendarSlot, title: e.target.value })}
                    placeholder="e.g., Batch Prep: 3x Chickpea Couscous Boxes for Exam Week"
                    className={`w-full px-3 py-2 rounded-lg border text-xs ${t.input}`}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs whitespace-nowrap transition cursor-pointer"
                >
                  + Add to Schedule
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ================= 6. MOD-05: GROCERY EXPENSE & PORTION BUDGET TRACKER ================= */}
        {activeTab === 'mod5' && (
          <div className="space-y-6">
            <div className={`rounded-2xl border p-6 transition-colors ${t.card}`}>
              <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4 ${t.divider}`}>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-500">
                    MOD-05 • Student Financial & Portion Ledger
                  </span>
                  <h1 className={`text-2xl font-bold ${t.heading}`}>
                    Grocery Expense & Portion-Cost Tracker
                  </h1>
                  <p className={`text-sm ${t.bodyText}`}>
                    Calculates true cost-per-portion across Dutch supermarkets and optimizes overlapping ingredients to eliminate student food waste.
                  </p>
                </div>

                {/* Weekly Budget Target Slider */}
                <div className={`p-3.5 rounded-xl border flex items-center gap-4 ${t.subCard}`}>
                  <div>
                    <label className={`block text-xs font-bold ${t.heading}`}>
                      Weekly Budget Ceiling: €{weeklyBudgetLimit}
                    </label>
                    <input
                      type="range"
                      min="30"
                      max="90"
                      step="5"
                      value={weeklyBudgetLimit}
                      onChange={(e) => setWeeklyBudgetLimit(Number(e.target.value))}
                      className="w-36 accent-emerald-500 mt-1 cursor-pointer"
                    />
                  </div>
                  <div className="text-right">
                    <span className={`text-xs block ${t.subText}`}>Remaining</span>
                    <span className={`text-lg font-bold ${darkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>
                      €{Math.max(0, weeklyBudgetLimit - totalWeeklySpent).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* 3 Financial Summary Boxes */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-5">
                <div
                  className={`p-4 rounded-xl border ${
                    darkMode
                      ? 'bg-emerald-950/40 border-emerald-800/70 text-emerald-200'
                      : 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                  }`}
                >
                  <span className="text-xs font-semibold opacity-80">Total Weekly Spend</span>
                  <p className="text-2xl font-bold mt-1">
                    €{totalWeeklySpent.toFixed(2)}{' '}
                    <span className="text-xs font-normal opacity-80">of €{weeklyBudgetLimit.toFixed(2)}</span>
                  </p>
                </div>
                <div
                  className={`p-4 rounded-xl border ${
                    darkMode
                      ? 'bg-teal-950/40 border-teal-800/70 text-teal-200'
                      : 'bg-teal-50/70 border-teal-200 text-teal-950'
                  }`}
                >
                  <span className="text-xs font-semibold opacity-80">Total Meal Portions Yielded</span>
                  <p className="text-2xl font-bold mt-1">
                    {totalPortionsYielded} Portions{' '}
                    <span className="text-xs font-normal opacity-80">(Breakfast, Lunch & Dinner)</span>
                  </p>
                </div>
                <div
                  className={`p-4 rounded-xl border ${
                    darkMode
                      ? 'bg-amber-950/40 border-amber-800/70 text-amber-200'
                      : 'bg-amber-50/70 border-amber-200 text-amber-950'
                  }`}
                >
                  <span className="text-xs font-semibold opacity-80">True Average Cost Per Portion</span>
                  <p className="text-2xl font-bold mt-1">
                    €{avgCostPerPortion.toFixed(2)}{' '}
                    <span className="text-xs font-normal opacity-80">vs €7.50 Campus Food Truck</span>
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Grocery Basket Table */}
                <div className="lg:col-span-2 space-y-2.5">
                  <h3 className={`font-bold text-sm ${t.heading}`}>Logged Supermarket Basket (Delft)</h3>
                  <div className={`overflow-x-auto rounded-xl border ${t.divider}`}>
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr
                          className={`border-b ${
                            darkMode
                              ? 'bg-slate-800/90 text-slate-300 border-slate-700'
                              : 'bg-slate-100 text-slate-600 border-slate-200'
                          }`}
                        >
                          <th className="py-2.5 px-3 font-semibold">Grocery Item</th>
                          <th className="py-2.5 px-3 font-semibold">Store</th>
                          <th className="py-2.5 px-3 font-semibold">Price</th>
                          <th className="py-2.5 px-3 font-semibold">Portions</th>
                          <th className="py-2.5 px-3 font-semibold">Cost / Portion</th>
                          <th className="py-2.5 px-3 font-semibold text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className={`divide-y ${darkMode ? 'divide-slate-800' : 'divide-slate-200'}`}>
                        {groceryItems.map((g) => (
                          <tr
                            key={g.id}
                            className={darkMode ? 'hover:bg-slate-800/50' : 'hover:bg-slate-50'}
                          >
                            <td className={`py-2.5 px-3 font-medium ${t.heading}`}>
                              {g.item}
                              {g.sharedIngredient && (
                                <span
                                  className={`ml-1.5 text-[10px] px-1.5 py-0.5 rounded-md font-semibold ${
                                    darkMode
                                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                                      : 'bg-emerald-100 text-emerald-800'
                                  }`}
                                >
                                  Multi-Recipe
                                </span>
                              )}
                            </td>
                            <td className={`py-2.5 px-3 ${t.bodyText}`}>{g.store}</td>
                            <td className={`py-2.5 px-3 font-semibold ${t.heading}`}>€{g.price.toFixed(2)}</td>
                            <td className={`py-2.5 px-3 ${t.bodyText}`}>{g.portions}</td>
                            <td
                              className={`py-2.5 px-3 font-bold ${
                                darkMode ? 'text-emerald-400' : 'text-emerald-700'
                              }`}
                            >
                              €{(g.price / g.portions).toFixed(2)}
                            </td>
                            <td className="py-2.5 px-3 text-right">
                              <button
                                onClick={() => handleDeleteGrocery(g.id)}
                                className="text-slate-400 hover:text-red-500 transition cursor-pointer"
                                title="Remove item"
                              >
                                <Trash2 className="w-4 h-4 inline" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Add Grocery Expense Form */}
                <form
                  onSubmit={handleAddGrocery}
                  className={`p-5 rounded-xl border space-y-3 self-start ${t.subCard}`}
                >
                  <h3 className={`font-bold text-sm flex items-center gap-2 ${t.heading}`}>
                    <ShoppingBag className="w-4 h-4 text-emerald-500" />
                    Log Grocery Receipt Item
                  </h3>
                  <div>
                    <label className={`block text-xs font-medium mb-1 ${t.bodyText}`}>Item Name & Weight</label>
                    <input
                      type="text"
                      required
                      value={newGrocery.item}
                      onChange={(e) => setNewGrocery({ ...newGrocery, item: e.target.value })}
                      placeholder="e.g., Vegetarian Feta Block (200g)"
                      className={`w-full px-3 py-2 rounded-lg border text-xs ${t.input}`}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className={`block text-xs font-medium mb-1 ${t.bodyText}`}>Supermarket</label>
                      <select
                        value={newGrocery.store}
                        onChange={(e) => setNewGrocery({ ...newGrocery, store: e.target.value })}
                        className={`w-full px-2.5 py-2 rounded-lg border text-xs ${t.input}`}
                      >
                        <option>Lidl</option>
                        <option>Albert Heijn</option>
                        <option>Jumbo</option>
                        <option>Amazing Oriental</option>
                      </select>
                    </div>
                    <div>
                      <label className={`block text-xs font-medium mb-1 ${t.bodyText}`}>Price (€)</label>
                      <input
                        type="number"
                        step="0.01"
                        required
                        value={newGrocery.price}
                        onChange={(e) => setNewGrocery({ ...newGrocery, price: e.target.value })}
                        placeholder="1.89"
                        className={`w-full px-2.5 py-2 rounded-lg border text-xs ${t.input}`}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={`block text-xs font-medium mb-1 ${t.bodyText}`}>
                      Portions Yielded Across Week
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="25"
                      value={newGrocery.portions}
                      onChange={(e) => setNewGrocery({ ...newGrocery, portions: e.target.value })}
                      className={`w-full px-3 py-2 rounded-lg border text-xs ${t.input}`}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition cursor-pointer"
                  >
                    + Add Item & Recalculate Portion Cost
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* ================= 7. PROJECT DELIVERABLE 1 (D1) & TEAM SHOWCASE ================= */}
        {activeTab === 'd1spec' && (
          <div className="space-y-6">
            {/* Project Vision Header */}
            <div className={`rounded-2xl border p-6 space-y-4 transition-colors ${t.card}`}>
              <div className={`flex flex-wrap items-center justify-between gap-2 border-b pb-4 ${t.divider}`}>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-500">
                    TU Delft • HAIP Project Group 1 • Project Deliverable 1 (D1)
                  </span>
                  <h1 className={`text-2xl font-bold mt-0.5 ${t.heading}`}>
                    Project Charter, Problem Statement & Functional Architecture
                  </h1>
                </div>
                <span
                  className={`px-3 py-1.5 rounded-xl font-bold text-xs ${
                    darkMode ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-emerald-100 text-emerald-900'
                  }`}
                >
                  Deliverable 1 Verified Spec
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="space-y-2">
                  <h3 className={`font-bold text-sm flex items-center gap-2 ${t.heading}`}>
                    <BookOpen className="w-4 h-4 text-emerald-500" />
                    Core Problem Statement & Vision
                  </h3>
                  <p className={`text-xs sm:text-sm leading-relaxed ${t.bodyText}`}>
                    University students and Teaching Assistants (TAs) face erratic academic schedules, tight grocery budgets, shared kitchen constraints, and strict dietary/allergen requirements (such as vegetarian, eggetarian, halal, or microbial-rennet-only cheese). Existing calorie trackers ignore recipe cost and prep windows, while budget apps ignore nutritional macros and ingredient overlap.
                  </p>
                  <p className={`text-xs sm:text-sm leading-relaxed ${t.bodyText}`}>
                    <strong>UniBite</strong> bridges this gap as a web-based smart meal-planning, nutrition, and portion-budget platform tailored to student life.
                  </p>
                </div>

                <div className={`p-4 rounded-xl border space-y-2.5 text-xs ${t.subCard}`}>
                  <h3 className={`font-bold text-sm ${t.heading}`}>Target Audience & Primary Personas</h3>
                  <ul className={`space-y-2 ${t.bodyText}`}>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>
                        <strong>University Students (BSc / MSc):</strong> Navigating exam weeks, shared dorm kitchens, and €40–€55 weekly grocery budgets while trying to avoid expensive campus takeout.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>
                        <strong>Teaching Assistants (TAs):</strong> Balancing study obligations with lab supervision, grading sprints, and fragmented 15–20 minute cooking windows.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Team Roster Section */}
            <div className={`rounded-2xl border p-6 transition-colors ${t.card}`}>
              <div className="mb-4">
                <h2 className={`text-lg font-bold ${t.heading}`}>HAIP Project Group 1 — Team Roster & Roles</h2>
                <p className={`text-xs ${t.subText}`}>
                  Delft University of Technology (TU Delft) — BSc Computer Science and Engineering (CSE)
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {TEAM_MEMBERS.map((member) => (
                  <div
                    key={member.studentNo}
                    className={`p-4 rounded-xl border flex flex-col justify-between space-y-3 ${t.subCard}`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`inline-block text-[11px] font-bold px-2.5 py-1 rounded-full border ${
                            darkMode ? member.darkBadge : member.lightBadge
                          }`}
                        >
                          {member.role}
                        </span>
                        <span className={`text-[11px] font-mono font-semibold ${t.subText}`}>
                          #{member.studentNo}
                        </span>
                      </div>
                      <h3 className={`font-bold text-base ${t.heading}`}>{member.name}</h3>
                      <p className="text-[11px] font-semibold text-emerald-500">{member.secondaryRole}</p>
                      <p className={`text-[11px] font-medium ${t.subText}`}>{member.department}</p>
                      <p className={`text-xs leading-relaxed pt-1 ${t.bodyText}`}>{member.focus}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Diversity Analysis & Competency Matrix */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className={`rounded-2xl border p-6 space-y-3 transition-colors ${t.card}`}>
                <h3 className={`font-bold text-base flex items-center gap-2 ${t.heading}`}>
                  <Globe className="w-5 h-5 text-emerald-500" />
                  Team Diversity & Lived Student Perspectives
                </h3>
                <p className={`text-xs leading-relaxed ${t.bodyText}`}>
                  Our four-member TU Delft CSE team combines complementary residential, cultural, and dietary perspectives that directly shape UniBite’s requirements:
                </p>
                <div className={`p-3.5 rounded-xl border space-y-2 text-xs ${t.subCard}`}>
                  <p>
                    • <strong>3 International Students Living in Shared Student Housing:</strong> Provide firsthand insight into shared kitchen bottlenecks (single-pot cooking, limited fridge shelf space), strict weekly grocery budgeting, and navigating Dutch supermarket labels for vegetarian/eggetarian and microbial-rennet compliance.
                  </p>
                  <p>
                    • <strong>1 Domestic Commuter Student Perspective:</strong> Brings practical experience with long transit days, portable cold-lunch meal prep that avoids campus microwave queues, and syncing nutrition around irregular lecture and TA blocks.
                  </p>
                </div>
              </div>

              <div className={`rounded-2xl border p-6 space-y-3 transition-colors ${t.card}`}>
                <h3 className={`font-bold text-base flex items-center gap-2 ${t.heading}`}>
                  <Layers className="w-5 h-5 text-emerald-500" />
                  Role Allocation & Backup Competency Matrix
                </h3>
                <p className={`text-xs ${t.subText}`}>
                  To mitigate single-point-of-failure risks during exam weeks, every functional area has a primary lead and designated backup owner:
                </p>
                <div className={`overflow-x-auto rounded-xl border ${t.divider}`}>
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr
                        className={`border-b ${
                          darkMode
                            ? 'bg-slate-800/90 text-slate-300 border-slate-700'
                            : 'bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        <th className="py-2 px-3 font-semibold">Functional Area</th>
                        <th className="py-2 px-3 font-semibold">Primary Owner</th>
                        <th className="py-2 px-3 font-semibold">Backup Owner</th>
                      </tr>
                    </thead>
                    <tbody className={`divide-y ${darkMode ? 'divide-slate-800' : 'divide-slate-200'}`}>
                      {COMPETENCY_MATRIX.map((row, idx) => (
                        <tr key={idx}>
                          <td className={`py-2 px-3 font-semibold ${t.heading}`}>{row.area}</td>
                          <td className="py-2 px-3 text-emerald-500 font-medium">{row.primary}</td>
                          <td className={`py-2 px-3 ${t.bodyText}`}>{row.backup}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* In-Scope Modules vs Out-of-Scope Boundaries */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                className={`rounded-2xl border p-6 space-y-3 transition-colors ${
                  darkMode ? 'bg-slate-900 border-emerald-800/70' : 'bg-white border-emerald-200 shadow-xs'
                }`}
              >
                <h3 className={`font-bold text-base flex items-center gap-2 ${t.heading}`}>
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  In-Scope Core Functional Modules (D1)
                </h3>
                <ul className={`space-y-2.5 text-xs ${t.bodyText}`}>
                  <li>
                    <strong>MOD-01 (AI Nutrition & Calorie Tracker):</strong> Daily macro logging, historical weekly trends, and energy/weight-management goals.
                  </li>
                  <li>
                    <strong>MOD-02 (Dietary & Allergen Engine):</strong> Hard constraint filtering for Vegetarian, Eggetarian, Vegan, Halal, Gluten/Lactose/Nut-Free, Microbial Rennet, and 1-Pot Low-Prep meals.
                  </li>
                  <li>
                    <strong>MOD-03 (Conversational Culinary & Budget Assistant):</strong> Real-time AI recipe generation and modification based on pantry leftovers, time limits, and remaining Euros.
                  </li>
                  <li>
                    <strong>MOD-04 (Calendar-Synced Meal Planner):</strong> Syncing meal prep blocks around lectures and TA duties with `.ics` export.
                  </li>
                  <li>
                    <strong>MOD-05 (Grocery Expense & Portion Tracker):</strong> Cost-per-portion breakdown and zero-waste overlapping ingredient alerts.
                  </li>
                </ul>
              </div>

              <div className={`rounded-2xl border p-6 space-y-3 transition-colors ${t.card}`}>
                <h3 className={`font-bold text-base flex items-center gap-2 ${t.heading}`}>
                  <AlertCircle className="w-5 h-5 text-amber-500" />
                  Explicit Out-of-Scope Boundaries (D1)
                </h3>
                <p className={`text-xs ${t.subText}`}>
                  To ensure high engineering focus and reliable validation during the course timeline, the following are strictly excluded from scope:
                </p>
                <ul className={`space-y-2.5 text-xs ${t.bodyText}`}>
                  <li className="flex items-start gap-2">
                    <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <span>
                      <strong>Direct E-Commerce Checkout & Delivery:</strong> No live payment processing or automated supermarket cart checkout.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <span>
                      <strong>Medical-Grade Clinical Diagnostics:</strong> Not a replacement for clinical dietitians or medical pathology prescriptions.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <span>
                      <strong>Native iOS / Android Mobile Binaries:</strong> Delivered as a responsive cross-device Web Application rather than native App Store builds.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}