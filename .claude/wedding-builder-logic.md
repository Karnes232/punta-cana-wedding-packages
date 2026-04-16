# Wedding Builder Logic
## Punta Cana Wedding Packages

Complete reference for how the wedding calculator works, what it calculates, and the business logic behind pricing. This is for developers building the calculator logic and Sanity schemas.

---

## Core Concept

The wedding calculator is an **automatic quote engine** that combines many cost categories into one final estimate. It is **NOT** a manual pricing tool. All prices come from Sanity; the calculator only multiplies and adds them together.

**Philosophy:**
> "The platform should not be guessing prices. It should be calculating them based on fixed data and formulas prepared in advance."

---

## Master Variable: Guest Count

**Guest count is the most important variable** because it affects many categories at once:

| Category | Impact |
|----------|--------|
| **Food/Menu** | Cost per person × guest count |
| **Beverages/Open Bar** | Service per person × guest count |
| **Furniture** | Table count (derived from guests) |
| **Transportation** | Vehicle count (derived from guests) |
| **Service staff** | Staffing requirements (derived from guests) |
| **Design complexity** | (Optional: more guests → more elaborate) |

**Rule:** Guest count should be established very early in the process (Step 2, right after date) and must be active in all calculations. If user changes guest count, all dependent costs recalculate immediately.

---

## Step-by-Step Flow

The calculator should guide users through these steps in order:

### Step 1: Wedding Date
**Input:** Date (calendar picker)
**Output:** Confirmed date for wedding
**Price Impact:** Potentially seasonal adjustments (if implemented; optional)
**User Action:** Select date → Continue

### Step 2: Number of Guests
**Input:** Number (input field, 10–500 range)
**Output:** Guest count (master variable)
**Price Impact:** MAJOR—affects food, drinks, tables, transport, staff
**User Action:** Enter number → Continue

**Important:** This triggers recalculation of all dependent costs.

### Step 3: Hotel or Area
**Input:** Dropdown or selection
**Options:** Punta Cana (general), Las Olas, Palma Soriano, El Cortecito, etc.
**Output:** Location for transportation cost calculation
**Price Impact:** Transportation pricing varies by hotel zone
**User Action:** Select area → Continue

### Step 4: Venue & Coordination
**Input:** Details about wedding style/type
**Output:** Venue selection (possibly just one option: Cabeza de Toro)
**Price Impact:** Venue cost (fixed) + coordination cost (fixed or variable)
**User Action:** Confirm → Continue

**Note:** If venue is always the same (Cabeza de Toro), this step can be informational + confirm coordination.

### Step 5: Menu Selection
**Input:** Dropdown with menu options
**Options:** (Examples)
- Classic Menu: $30/person
- Tropical Menu: $40/person
- Premium Menu: $55/person
- Family Style: $35/person
**Output:** Selected menu + unit cost
**Calculation:** Menu cost per person × guest count = Total food cost
**Price Impact:** MAJOR—one of largest line items
**User Action:** Select menu, view price → Continue

**Note:** Each menu might have a description, style (buffet/plated), and dietary notes.

### Step 6: Drinks & Open Bar
**Input:** Multi-part selection
- **Bar type:** Basic, Premium, Top-shelf
- **Duration:** 3 hours, 5 hours, 8 hours (all-day)
**Output:** Selected package
**Pricing examples:**
- Basic bar, 3 hrs: $18/person/hour × 3 = $54/person
- Premium bar, 5 hrs: $28/person/hour × 5 = $140/person
- Top-shelf, 8 hrs: $40/person/hour × 8 = $320/person
**Calculation:** Rate per person × hours × guest count = Total bar cost
**Price Impact:** MAJOR—can vary significantly
**User Action:** Select type and duration, view price → Continue

**Add-ons (optional upgrades):**
- Champagne toast: +$500
- Signature cocktails: +$15/person
- Wine service (wine-pairing meal): +$20/person
- After-dinner drinks/digestif: +$8/person
- Coffee station: +$200

### Step 7: Furniture (Chairs, Tables, Linens)
**Input:** Multi-part selection
- **Table type:** Standard round, Premium round, Long banquet, Cocktail high-top
- **Chair type:** Standard, Cross-back (premium), Chiavari (luxury)
- **Linens:** Color selection, premium vs. standard
**Output:** Combination of selections
**Calculation:**
- Table count derived from guest count ÷ seats per table (e.g., 10 guests = 1 table of 10)
- Each table + chair + linen combination has a price
- Total = (table cost + chairs × quantity) × table count + linen cost
**Pricing example:**
- Standard table + standard chairs + standard linens: $15/table
- Premium round + cross-back chairs + premium linens: $45/table
**Price Impact:** MEDIUM—affects overall aesthetic and cost
**User Action:** Select style, view calculation → Continue

### Step 8: Decoration & Floral Design
**Input:** Package selection with potential add-ons
**Packages (examples):**
- **Classic Decor:** $3,000 (basic florals, simple centerpieces, clean setup)
- **Elegant Decor:** $6,000 (upgraded florals, premium centerpieces, enhanced lighting)
- **Premium Decor:** $10,000 (luxury florals, elaborate arrangements, full design)
**Add-ons (per-unit or fixed):**
- Aisle florals: +$500
- Extra centerpiece upgrades: +$100/per table
- Candles/lighting upgrades: +$500
- Sweetheart table design: +$500
- Ceremony arch/structure: +$800
- Lounge setup florals: +$300
**Calculation:**
- Base package + sum of selected add-ons = Total decor cost
**Price Impact:** MEDIUM-HIGH—emotional importance, significant cost
**User Action:** Select package, add upgrades, see total → Continue

### Step 9: Photography
**Input:** Package selection
**Packages (examples):**
- **Standard Coverage (8 hours):** $2,500 (1 photographer, traditional shots)
- **Premium Coverage (10 hours):** $4,000 (2 photographers, 10 hours, more candid)
- **Luxury Coverage (12 hours):** $6,000 (2 photographers, 12 hours, pre-wedding session)
**Add-ons:**
- Drone footage: +$800
- Engagement session: +$500
- Album printing: +$300
- Digital proofs/gallery rush delivery: +$200
**Calculation:**
- Base package + selected add-ons = Total photo cost
**Price Impact:** MEDIUM-HIGH—very important to many couples
**User Action:** Select package, choose add-ons, see total → Continue

### Step 10: Videography
**Input:** Package selection (similar to photography)
**Packages (examples):**
- **Standard Video (8 hours):** $2,500 (1 videographer, highlights reel)
- **Premium Video (12 hours):** $4,500 (2 videographers, full-day, cinematic edit)
- **Luxury Video + Drone (12 hours):** $6,500 (cinematic, drone, multiple angles)
**Add-ons:**
- Highlight reel same-day edit: +$500
- Drone footage upgrade: +$600
- Social media content package: +$300
- Ceremony only (shorter): -$1,000
**Calculation:**
- Base package + selected add-ons = Total video cost
**Price Impact:** MEDIUM—often bundled with photography decision
**User Action:** Select package, choose add-ons, see total → Continue

### Step 11: Transportation
**Input:** Pickup location + vehicle needs (derived from guest count)
**Calculation Logic:**
- Get transportation rates from Sanity (by pickup zone + vehicle type)
- Calculate vehicle count needed: guest count ÷ vehicle capacity
- Total = rate per vehicle × vehicle count
**Pricing example (rates from Sanity):**
- Zone 1 (Las Olas), passenger van (15 seats): $150/vehicle
- If 30 guests, need 2 vans: 2 × $150 = $300
- If 60 guests, need 4 vans: 4 × $150 = $600
**Price Impact:** MEDIUM—varies significantly by guest count and zone
**User Action:** Select pickup zone, system calculates needed vehicles → Continue

### Step 12: Entertainment & Atmosphere
**Input:** Selection of entertainment options (can be multiple)
**Options (fixed-price or hourly):**
- **DJ (5 hours):** $1,200
- **DJ (7 hours):** $1,600
- **Live Band (3 hours):** $2,500
- **Violinist (ceremony + cocktail hour):** $400
- **Saxophonist (cocktail hour, 1 hour):** $250
- **Mariachi (1 hour):** $300
- **MC/Host service:** $200
- **Lighting upgrade (uplighting, cold sparks):** $600
- **Photo booth (4 hours):** $800
**Calculation:**
- Sum of all selected entertainment options = Total entertainment cost
**Price Impact:** MEDIUM—enhances experience, not mandatory
**User Action:** Select options, view running total → Continue

### Step 13: Extras & Optional Experiences
**Input:** Selection of optional add-on experiences
**Options (per-person or fixed):**
- **Welcome Dinner (day before):** $45/person (menu-dependent)
- **Farewell Brunch (day after):** $35/person
- **Private Saona Island Trip (half-day):** $85/person
- **Private Catamaran/Boat Party (evening):** $120/person
- **Buggy Excursion (group tour):** $50/person
- **Spa service at hotel:** $35/person

**Calculation (per-person):**
- Option cost per person × guest count = Total for that option
- Sum all selected = Total extras cost

**Note:** These should feel like luxury add-ons, not core wedding elements. They increase final value but are optional.
**Price Impact:** LOW-MEDIUM—increases total, optional
**User Action:** Select experiences, see per-person and total costs → Continue

---

## Summary Page (Before Form Submission)

After all steps are complete, show a comprehensive summary:

```
YOUR WEDDING SUMMARY
═════════════════════════════════════════

Wedding Date: December 15, 2025
Number of Guests: 75

PRICING BREAKDOWN:
─────────────────────────────────────────

Venue & Coordination:        $4,500.00
Menu (Tropical × 75):        $3,000.00
Open Bar (Premium 5h × 75):  $10,500.00
Furniture & Linens:          $2,250.00
Decoration & Florals:        $6,000.00
Photography:                 $4,000.00
Videography:                 $4,500.00
Transportation (3 vans):     $450.00
Entertainment:               $2,500.00
Extras (Welcome Dinner):     $3,375.00

═════════════════════════════════════════
ESTIMATED TOTAL:            $40,675.00
═════════════════════════════════════════

NEXT STEPS:
• Pay US$500 deposit to secure date
• 50% due 30 days before wedding
• Final 50% due 15 days before wedding
• Wedding assistant will contact you within 24 hours

[Edit selections]  [Continue to form]
```

---

## Final Form Submission

After summary, user completes form:

```
Complete Your Wedding Request

Your Name:              [Input]
Your Email:            [Input]
WhatsApp Number:       [Input (optional)]
Phone Number:          [Input (optional)]

Special Notes/Questions:
[Textarea - dietary restrictions, preferences, etc.]

Do you understand the payment terms?
[Checkbox] Yes, I understand
  - US$500 deposit to secure date
  - 50% due 30 days before wedding
  - Final 50% due 15 days before wedding

[Submit Request]
```

**What Happens on Submit:**
1. Form data captured (name, email, phone)
2. Full wedding config + estimated total sent via email to planning team
3. Confirmation sent to user: "Thank you! Our team will contact you within 24 hours."

**Email to Team Includes:**
- Couple's contact info
- Wedding date
- Guest count
- Hotel/area
- Full summary of selections
- Estimated total
- Special notes

---

## Important Constraints

### Fixed Venue
All weddings are in Cabeza de Toro. This is NOT user-selectable. However:
- Show venue cost as line item (confirms value)
- Explain venue capabilities
- Optional: Allow user to select wedding style/type (ceremony + reception setup)

### Predetermined Pricing
ALL prices come from Sanity. The calculator never invents prices. Every category must have predefined pricing data in Sanity.

### Recalculation Triggers
- Guest count changes → ALL dependent costs recalculate immediately
- Any package/option change → Total recalculates immediately
- User always sees live, current total

### Transparency
- User must always understand what they selected
- User must understand why price changed when they make selections
- Running total always visible or easily accessible

---

## Price Update Logic (Real-Time)

Every time user changes a selection:

```
User changes Menu selection
  ↓
Fetch menu cost per person
  ↓
Calculate: menu_cost × guest_count
  ↓
Update total: remove old menu cost, add new menu cost
  ↓
Display updated total with animation/highlight
  ↓
Update summary (if visible)
```

This should feel instant and smooth (not laggy).

---

## Validation Rules

- **Guest count:** 10–500 minimum
- **Date:** Cannot be in past; must be at least 6 months out (configurable)
- **Form submission:** All required fields must be filled
- **Email validation:** Valid email required
- **WhatsApp/Phone:** Validate phone format if provided

---

## Business Rules (Non-Technical, FYI)

- **Date flexibility:** Once booked, date can be moved without extra fee (if new date available)
- **Advance booking:** Couple can book years in advance (e.g., 2026 for 2028 wedding)
- **Deposit deductible:** US$500 deposit counts toward total wedding cost
- **Payment schedule:** No payment on website; payments handled offline
- **Support:** 24/7 availability after submission
- **Venue visit:** Couple can visit before wedding (arranged by team)

These should be clearly communicated in the "How It Works" page and form confirmation.

---

## Technical Implementation Notes

### Sanity Structure
Each pricing category should be its own document or object in Sanity:
- `MenuOption` (document): name, cost_per_person, description
- `BarPackage` (document): name, cost_per_person_per_hour, hours_options
- `FurnitureOption` (object): chair_type, table_type, linen_color, cost
- `DecorPackage` (document): name, base_cost, add_ons[]
- `PhotoPackage` (document): name, hours, cost, add_ons[]
- etc.

### React State (Client-Side)
Calculator should manage state for:
```typescript
type CalculatorState = {
  date: string
  guests: number
  hotel: string
  menu: MenuOption
  barPackage: BarPackage
  furniture: FurnitureOption
  decor: DecorPackage
  photo: PhotoPackage
  video: VideoPackage
  transport: TransportSelection
  entertainment: EntertainmentOption[]
  extras: ExtraOption[]
  estimatedTotal: number
}
```

Every change to state should trigger recalculation of `estimatedTotal`.

### Calculation Function (Pseudocode)
```typescript
function calculateTotal(state: CalculatorState): number {
  let total = 0
  
  total += FIXED_VENUE_COST
  total += FIXED_COORDINATION_COST
  
  // Food
  total += state.menu.cost_per_person * state.guests
  
  // Drinks
  total += state.barPackage.cost_per_person_per_hour * state.barPackage.selected_hours * state.guests
  total += state.barPackage.add_ons.reduce((sum, addon) => sum + addon.cost, 0)
  
  // Furniture
  const table_count = Math.ceil(state.guests / SEATS_PER_TABLE)
  total += state.furniture.cost * table_count
  
  // Decor
  total += state.decor.base_cost
  total += state.decor.add_ons.reduce((sum, addon) => sum + addon.cost, 0)
  
  // Photo/Video
  total += state.photo.cost + state.photo.add_ons.reduce((sum, addon) => sum + addon.cost, 0)
  total += state.video.cost + state.video.add_ons.reduce((sum, addon) => sum + addon.cost, 0)
  
  // Transportation
  const vehicle_count = Math.ceil(state.guests / VEHICLE_CAPACITY)
  total += state.transport.rate_per_vehicle * vehicle_count
  
  // Entertainment
  total += state.entertainment.reduce((sum, opt) => sum + opt.cost, 0)
  
  // Extras (per-person)
  total += state.extras.reduce((sum, extra) => {
    if (extra.is_per_person) return sum + (extra.cost * state.guests)
    else return sum + extra.cost
  }, 0)
  
  return Math.round(total * 100) / 100 // Two decimal places
}
```

---

## Testing & Validation Checklist

- [ ] Adding guests recalculates all dependent costs
- [ ] Changing menu updates food cost and total
- [ ] Changing bar type/duration updates bar cost
- [ ] Furniture calculation correct for table count
- [ ] Transportation correct for hotel zone + guest count
- [ ] All add-ons add to their parent category
- [ ] Summary shows all selections
- [ ] Form submission sends complete data to team
- [ ] Running total never goes negative
- [ ] Prices always show 2 decimal places

---

This is the complete business logic. Build the Sanity schemas and React components around this flow.