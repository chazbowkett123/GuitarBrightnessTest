# Guitar Brightness Test

A web-based listening test for ranking guitar chord brightness.

## Description
This project presents users with different guitar chord recordings and asks them to rank them by brightness.

## Initial Setup
By default, the application should start on the instructions page. If it's starting directly on the chord test, check the following:

1. Ensure the default route in your routing configuration points to the instructions page
2. Verify that the initial navigation isn't being overridden
3. Check for any auto-forwarding logic in the app initialization

### Common Fix
If the app is starting on chord A test instead of instructions, modify the root route to point to the instructions component first.

```typescript
// In your routing configuration:
const routes = [
  { path: '', redirectTo: '/instructions', pathMatch: 'full' },
  // ... other routes
];
```
