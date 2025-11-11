# E-Venue Admin Dashboard - Color Theme

## Dark Navy Blue Theme with Cyan Accents

### Primary Colors
```javascript
// JavaScript/TypeScript (React Native, Expo)
const theme = {
  // Backgrounds
  background: '#0F172A',        // HSL(222, 47%, 11%) - Main background
  sidebar: '#0A0F1C',           // HSL(222, 47%, 9%) - Sidebar background
  card: '#152030',              // HSL(222, 47%, 13%) - Card background
  popover: '#1A2535',           // HSL(222, 47%, 14%) - Popover/modal
  
  // Primary Accent (Cyan/Teal)
  primary: '#22D3EE',           // HSL(188, 94%, 56%) - Main accent color
  primaryDark: '#0EA5E9',       // Darker variant
  
  // Text
  foreground: '#E2E8F0',        // HSL(213, 31%, 91%) - Primary text
  mutedText: '#94A3B8',         // HSL(215, 20%, 65%) - Secondary text
  
  // Borders & Dividers
  border: '#1E293B',            // HSL(217, 33%, 17%) - Borders
  cardBorder: '#253548',        // HSL(217, 33%, 18%) - Card borders
  
  // UI Elements
  secondary: '#1E293B',         // HSL(217, 33%, 17%) - Secondary elements
  muted: '#1A2535',             // HSL(217, 33%, 15%) - Muted backgroundssa
  input: '#253548',             // HSL(217, 33%, 20%) - Input backgroundss
  
  // Status Colors
  destructive: '#EF4444',       // HSL(0, 84%, 60%) - Error/Delete
  success: '#6EE7B7',           // HSL(142, 76%, 72%) - Success
  warning: '#FBBF24',           // HSL(27, 87%, 65%) - Warning
  
  // Chart Colors
  chart1: '#22D3EE',            // Cyan
  chart2: '#38BDF8',            // Blue
  chart3: '#5EEAD4',            // Teal
  chart4: '#6EE7B7',            // Green
  chart5: '#FBBF24',            // Orange
};
```

### Flutter Theme
```dart
// Flutter/Dart
class AppColors {
  // Backgrounds
  static const Color background = Color(0xFF0F172A);      // Dark navy
  static const Color sidebar = Color(0xFF0A0F1C);         // Darkest navy
  static const Color card = Color(0xFF152030);            // Card background
  
  // Primary
  static const Color primary = Color(0xFF22D3EE);         // Cyan accent
  static const Color primaryDark = Color(0xFF0EA5E9);     // Darker cyan
  
  // Text
  static const Color foreground = Color(0xFFE2E8F0);      // Primary text
  static const Color mutedText = Color(0xFF94A3B8);       // Secondary text
  
  // Borders
  static const Color border = Color(0xFF1E293B);          // Borders
  static const Color cardBorder = Color(0xFF253548);      // Card borders
  
  // Status
  static const Color destructive = Color(0xFFEF4444);     // Red
  static const Color success = Color(0xFF6EE7B7);         // Green
}
```

### Swift/iOS Theme
```swift
// Swift/iOS
extension UIColor {
    // Backgrounds
    static let appBackground = UIColor(red: 0.06, green: 0.09, blue: 0.16, alpha: 1.0)      // #0F172A
    static let appSidebar = UIColor(red: 0.04, green: 0.06, blue: 0.11, alpha: 1.0)         // #0A0F1C
    static let appCard = UIColor(red: 0.08, green: 0.13, blue: 0.19, alpha: 1.0)            // #152030
    
    // Primary
    static let appPrimary = UIColor(red: 0.13, green: 0.83, blue: 0.93, alpha: 1.0)         // #22D3EE
    static let appPrimaryDark = UIColor(red: 0.05, green: 0.65, blue: 0.91, alpha: 1.0)     // #0EA5E9
    
    // Text
    static let appForeground = UIColor(red: 0.89, green: 0.91, blue: 0.94, alpha: 1.0)      // #E2E8F0
    static let appMutedText = UIColor(red: 0.58, green: 0.64, blue: 0.72, alpha: 1.0)       // #94A3B8
    
    // Borders
    static let appBorder = UIColor(red: 0.12, green: 0.16, blue: 0.23, alpha: 1.0)          // #1E293B
}
```

### Hex Color Codes (Quick Reference)
```
Backgrounds:
- Main Background:  #0F172A
- Sidebar:          #0A0F1C
- Card:             #152030
- Popover:          #1A2535

Primary Accent:
- Primary:          #22D3EE (Cyan)
- Primary Dark:     #0EA5E9

Text:
- Foreground:       #E2E8F0 (Light gray)
- Muted:            #94A3B8 (Medium gray)

Borders:
- Border:           #1E293B
- Card Border:      #253548

Status:
- Destructive:      #EF4444 (Red)
- Success:          #6EE7B7 (Green)
- Warning:          #FBBF24 (Orange)

Chart Colors:
- Chart 1 (Cyan):   #22D3EE
- Chart 2 (Blue):   #38BDF8
- Chart 3 (Teal):   #5EEAD4
- Chart 4 (Green):  #6EE7B7
- Chart 5 (Orange): #FBBF24
```

### Design Principles
1. **Dark Navy Base**: Deep, professional dark blue (`#0F172A`)
2. **Cyan Accent**: Vibrant cyan/teal (`#22D3EE`) for primary actions and highlights
3. **High Contrast**: Light text (`#E2E8F0`) on dark backgrounds for readability
4. **Subtle Borders**: Dark gray-blue borders (`#1E293B`) for separation
5. **Layered Depth**: Multiple shades of navy for cards, sidebar, and backgrounds
6. **Vibrant Charts**: Bright, saturated colors for data visualization

### Usage Tips
- Use **primary cyan** for buttons, links, and interactive elements
- Use **dark navy** backgrounds with subtle gradients
- Apply **glassmorphism** effects (backdrop blur + transparency)
- Maintain **high contrast** for text readability
- Use **subtle shadows** for depth and elevation

