const cart = [
  { name: "Laptop", price: 1000 },
  { name: "Phone", price: 500 },
  { name: "Headphones", price: 200 }
];

/**
 * BUG #1: Loop used <= instead of < → accessed cartItems[3] (undefined)
 * DevTools: Breakpoint line 5 + Scope showed i=3, cartItems[3]=undefined
 * FIX: Changed <= to <
 */
function calculateTotal(cartItems) {
  let total = 0;
  for (let i = 0; i < cartItems.length; i++) {  // FIXED: < not <=
    total += cartItems[i].price;
  }
  return total;
}

/**
 * BUG #2: Wrong discount formula
 * DevTools: Scope panel showed correct math but wrong logic
 * FIX: total * (1 - discountRate)
 */
function applyDiscount(total, discountRate = 0) {  // Default param safety
  return total * (1 - discountRate);  // FIXED formula
}

/**
 * BUG #3: total.toFixed(2) crashes if total=NaN
 * DevTools: Console error at line 19
 * FIX: Added NaN check
 */
function generateReceipt(cartItems, total) {
  let receipt = "Items:\n";
  cartItems.forEach(item => {
    receipt += `${item.name}: $${item.price}\n`;
  });
  receipt += `Total: $${isNaN(total) ? 0 : total.toFixed(2)}`;  // FIXED
  return receipt;
}

// Test it
console.log("Starting shopping cart calculation...");
const total = calculateTotal(cart);           // 1700
const discountedTotal = applyDiscount(total, 0.2);  // 1360
const receipt = generateReceipt(cart, discountedTotal);

document.getElementById("total").textContent = `Total: $${discountedTotal.toFixed(2)}`;
document.getElementById("receipt").textContent = receipt;

console.log("Final total:", discountedTotal);  // Should log 1360


console.log("Empty:", calculateTotal([]));
console.log("Single:", calculateTotal([{name:"Shirt", price:20}]));
console.log("No discount:", applyDiscount(100, 0)); 
console.log("100% off:", applyDiscount(100, 1));
