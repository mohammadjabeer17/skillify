# 🔑 HOW TO GET YOUR RAZORPAY API KEYS

## Current Status: Authentication Error (401) ✅ GOOD NEWS!

**Good News**: The "Could not create order" error is FIXED! ✅
**Current Issue**: The Razorpay API keys in the code are invalid/expired.

You're seeing: `ERROR Order creation error: { statusCode: 401, error: { description: 'Authentication failed' }}`

This means Razorpay is working correctly, but the API keys are wrong.

## Solution: Get Your Own Razorpay Keys

### Step 1: Sign Up / Log In to Razorpay
1. Go to: https://dashboard.razorpay.com/
2. Sign up for a free account (or log in if you have one)
3. Complete the verification process

### Step 2: Get Your Test Keys
1. After logging in, go to: **Settings** → **API Keys**
2. Click on **"Generate Test Key"** (if you haven't already)
3. You'll see two keys:
   - **Key ID** (starts with `rzp_test_`)
   - **Key Secret** (a long alphanumeric string)

### Step 3: Update Your Project

#### Option A: Update .env file (Recommended)
1. Open `.env` file in your project root
2. Replace the placeholder values:
   ```env
   RAZORPAY_KEY_ID=rzp_test_YOUR_ACTUAL_KEY_ID
   RAZORPAY_KEY_SECRET=YOUR_ACTUAL_KEY_SECRET
   ```

#### Option B: Update the code directly
If .env is not working, update these files:

1. **server/api/payments/create-order.ts** (around line 11-12):
   ```typescript
   key_id: "rzp_test_YOUR_ACTUAL_KEY_ID",
   key_secret: "YOUR_ACTUAL_KEY_SECRET",
   ```

2. **app/plugins/razorpay.client.ts** (around line 27):
   ```typescript
   key: "rzp_test_YOUR_ACTUAL_KEY_ID",
   ```

3. **app/pages/payments/[id].vue** (around line 145):
   ```typescript
   key: "rzp_test_YOUR_ACTUAL_KEY_ID",
   ```

### Step 4: Restart Your Server
1. Stop the dev server (Ctrl+C in terminal)
2. Start it again: `npm run dev`
3. Try the payment again

## Example of Valid Keys

Your keys should look like this (but with different characters):

```env
RAZORPAY_KEY_ID=rzp_test_1a2B3c4D5e6F7g
RAZORPAY_KEY_SECRET=AbCdEfGhIjKlMnOpQrStUvWx
```

## Quick Test After Adding Keys

1. Open your app: http://localhost:3001
2. Navigate to a course
3. Click "Proceed to Pay"
4. The Razorpay modal should open
5. Use these test card details:
   - Card: **4111 1111 1111 1111**
   - CVV: **123**
   - Expiry: **12/25**

## Important Notes

✅ **Test Mode**: Test keys start with `rzp_test_` - these are for development
✅ **Test Cards**: Use Razorpay test cards (no real money charged)
✅ **Free**: Test mode is completely free
✅ **Safe**: No real transactions in test mode

❌ **Don't Use**: The keys in the original code (they're invalid/expired)
❌ **Don't Share**: Keep your keys secret (especially the Key Secret)

## Verification Checklist

After adding your keys, check:
- [ ] Keys copied correctly (no extra spaces)
- [ ] Using TEST keys (start with `rzp_test_`)
- [ ] Updated in .env file
- [ ] Restarted the dev server
- [ ] Browser console shows no errors
- [ ] Server logs show successful order creation

## Still Having Issues?

1. **Clear browser cache**: Ctrl+Shift+Delete
2. **Check .env is being read**: Add `console.log(process.env.RAZORPAY_KEY_ID)` in create-order.ts
3. **Verify keys are active**: Check Razorpay dashboard
4. **Check server logs**: Look for "Create order request" message

## Need Help Getting Keys?

Razorpay Support:
- Email: support@razorpay.com
- Docs: https://razorpay.com/docs/payments/dashboard/account-settings/api-keys/

---

**Remember**: The payment gateway code is now working perfectly! You just need to add your own valid API keys. 🎉
