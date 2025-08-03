# Phone Number Registration Feature

## Overview
This feature adds required phone number fields for MTN Rwanda and AIRTEL Rwanda to the user registration process. Users must provide at least one valid Rwandan phone number during registration.

## Database Changes

### New Columns Added to `user_profile` table:
- `mtn_phone` (VARCHAR(15)) - For MTN Rwanda phone numbers
- `airtel_phone` (VARCHAR(15)) - For AIRTEL Rwanda phone numbers

### Constraints:
1. **Format Validation**: Phone numbers must match Rwandan format patterns
2. **At Least One Required**: Users must provide at least one phone number
3. **Unique Constraint**: Each phone number can only be used once
4. **Format Patterns**:
   - MTN: 078XXXXXXX, 079XXXXXXX (with or without +250 prefix)
   - AIRTEL: 073XXXXXXX, 072XXXXXXX (with or without +250 prefix)

## Implementation Details

### Frontend Changes (ProfileRegistrationForm.jsx):
1. Added phone number fields to form state
2. Added validation for phone number formats
3. Added real-time availability checking
4. Added visual feedback for checking status
5. Added proper error messaging

### Backend Changes (userService.js):
1. Updated `createUserProfile` function to handle phone numbers
2. Added `checkPhoneAvailability` function
3. Added server-side validation for phone formats
4. Updated database insert query to include phone fields

### Database Migration (add_phone_columns.sql):
1. Added phone number columns
2. Added format validation constraints
3. Added uniqueness constraints
4. Added requirement for at least one phone number
5. Added proper indexing for performance

## Usage

### Valid Phone Number Formats:
- **MTN**: 0781234567, 0791234567, +250781234567, +250791234567
- **AIRTEL**: 0731234567, 0721234567, +250731234567, +250721234567

### Registration Process:
1. User fills out registration form
2. Must provide at least one valid Rwandan phone number
3. System validates format in real-time
4. System checks availability on blur
5. Registration completes with phone numbers stored

## Error Handling

### Validation Errors:
- "At least one phone number (MTN or AIRTEL) is required"
- "MTN phone must start with 078 or 079"
- "AIRTEL phone must start with 073 or 072"
- "This phone number is already registered"

### Format Examples:
- ✅ Valid: 0781234567, +250781234567
- ❌ Invalid: 0701234567, 1234567890, +1234567890

## Database Migration Instructions

1. Run the migration file to add phone columns:
```sql
-- Run: database/add_phone_columns.sql
```

2. The migration includes:
   - Adding new columns
   - Adding format constraints
   - Adding uniqueness constraints
   - Adding indexes for performance

## Testing

### Test Cases:
1. **Valid Registration**: Provide valid MTN or AIRTEL number
2. **Invalid Format**: Try invalid phone number formats
3. **Duplicate Numbers**: Try registering with existing phone number
4. **No Phone**: Try registering without any phone number
5. **Both Numbers**: Register with both MTN and AIRTEL numbers

### Expected Behavior:
- Form shows real-time validation feedback
- Availability checking on blur events
- Clear error messages for invalid inputs
- Successful registration with valid phone numbers

## Future Enhancements

1. **Phone Verification**: Add SMS verification for phone numbers
2. **International Support**: Extend to support other countries
3. **Phone Preferences**: Allow users to set primary phone number
4. **Recovery**: Use phone numbers for account recovery

## Files Modified

### Frontend:
- `src/components/ProfileRegistrationForm.jsx` - Added phone number UI and validation
- `src/services/userService.js` - Added phone validation and availability checking

### Backend/Database:
- `database/add_phone_columns.sql` - Database migration for phone columns

### Documentation:
- `README-PhoneNumbers.md` - This documentation file
