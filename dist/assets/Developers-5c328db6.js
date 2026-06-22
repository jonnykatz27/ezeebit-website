import{c as d,r as x,j as e,S,m as s,Z as A,a as P,G as T}from"./index-b625556e.js";import{E as g}from"./external-link-48950573.js";import{C as l}from"./check-circle-95873d1a.js";import{A as I}from"./alert-circle-92a5a4e3.js";const E=d("Code",[["polyline",{points:"16 18 22 12 16 6",key:"z7tu5w"}],["polyline",{points:"8 6 2 12 8 18",key:"1eg1df"}]]),w=d("Copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]),O=d("Database",[["ellipse",{cx:"12",cy:"5",rx:"9",ry:"3",key:"msslwz"}],["path",{d:"M3 5V19A9 3 0 0 0 21 19V5",key:"1wlel7"}],["path",{d:"M3 12A9 3 0 0 0 21 12",key:"mv7ke4"}]]),p=d("Key",[["circle",{cx:"7.5",cy:"15.5",r:"5.5",key:"yqb3hr"}],["path",{d:"m21 2-9.6 9.6",key:"1j0ho8"}],["path",{d:"m15.5 7.5 3 3L22 7l-3-3",key:"1rn1fs"}]]),z=d("Terminal",[["polyline",{points:"4 17 10 11 4 5",key:"akl6gq"}],["line",{x1:"12",x2:"20",y1:"19",y2:"19",key:"q2wloq"}]]),b=d("Webhook",[["path",{d:"M18 16.98h-5.99c-1.1 0-1.95.94-2.48 1.9A4 4 0 0 1 2 17c.01-.7.2-1.4.57-2",key:"q3hayz"}],["path",{d:"m6 17 3.13-5.78c.53-.97.1-2.18-.5-3.1a4 4 0 1 1 6.89-4.06",key:"1go1hn"}],["path",{d:"m12 6 3.13 5.73C15.66 12.7 16.9 13 18 13a4 4 0 0 1 0 8",key:"qlwsc0"}]]),$=()=>{const[o,v]=x.useState("create-order"),[r,h]=x.useState("uat"),[u,y]=x.useState(""),n={live:"https://api.ezeebit.com",uat:"https://uat-ezeebit.com"},c={"create-order":{title:"Create Order",method:"POST",endpoint:"/create-order",description:"Create a new crypto payment order with specified amount and currency",curl:`curl -X POST ${n[r]}/create-order \\
  -H "Authorization: Bearer your-api-key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "merchant_id": "merchant_123",
    "amount": 100.00,
    "currency": "ZAR",
    "asset": "USDC",
    "network": "ERC20",
    "callback_url": "https://yoursite.com/webhook",
    "order_reference": "order_456"
  }'`,javascript:`// Create Order - JavaScript/Node.js
const response = await fetch('${n[r]}/create-order', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer your-api-key',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    merchant_id: 'merchant_123',
    amount: 100.00,
    currency: 'ZAR',
    asset: 'USDC',
    network: 'ERC20',
    callback_url: 'https://yoursite.com/webhook',
    order_reference: 'order_456'
  })
});

const order = await response.json();
console.log('Order created:', order);`,python:`# Create Order - Python
import requests

url = '${n[r]}/create-order'
headers = {
    'Authorization': 'Bearer your-api-key',
    'Content-Type': 'application/json'
}
data = {
    'merchant_id': 'merchant_123',
    'amount': 100.00,
    'currency': 'ZAR',
    'asset': 'USDC',
    'network': 'ERC20',
    'callback_url': 'https://yoursite.com/webhook',
    'order_reference': 'order_456'
}

response = requests.post(url, headers=headers, json=data)
order = response.json()
print('Order created:', order)`,response:`{
  "order_id": "ord_1234567890",
  "payment_address": "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4",
  "qr_code_url": "https://api.ezeebit.com/qr/ord_1234567890",
  "amount_crypto": "100.00",
  "amount_fiat": "100.00",
  "currency": "ZAR",
  "asset": "USDC",
  "network": "ERC20",
  "status": "pending",
  "expires_at": "2024-01-15T10:30:00Z"
}`},"get-order":{title:"Get Order",method:"GET",endpoint:"/order/{order_id}",description:"Retrieve order details and current status",curl:`curl -X GET ${n[r]}/order/ord_1234567890 \\
  -H "Authorization: Bearer your-api-key"`,javascript:`// Get Order - JavaScript/Node.js
const response = await fetch('${n[r]}/order/ord_1234567890', {
  headers: {
    'Authorization': 'Bearer your-api-key'
  }
});

const order = await response.json();
console.log('Order status:', order);`,python:`# Get Order - Python
import requests

url = '${n[r]}/order/ord_1234567890'
headers = {
    'Authorization': 'Bearer your-api-key'
}

response = requests.get(url, headers=headers)
order = response.json()
print('Order status:', order)`,response:`{
  "order_id": "ord_1234567890",
  "status": "completed",
  "amount_crypto": "100.00",
  "amount_fiat": "100.00",
  "currency": "ZAR",
  "asset": "USDC",
  "network": "ERC20",
  "transaction_hash": "0x1234...abcd",
  "created_at": "2024-01-15T10:00:00Z",
  "completed_at": "2024-01-15T10:05:00Z"
}`},"create-store":{title:"Create Store",method:"POST",endpoint:"/create-store",description:"Create a new store for merchant management",curl:`curl -X POST ${n[r]}/create-store \\
  -H "Authorization: Bearer your-api-key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "merchant_id": "merchant_123",
    "store_name": "My Crypto Store",
    "store_description": "Online electronics store",
    "callback_url": "https://mystore.com/webhook"
  }'`,javascript:`// Create Store - JavaScript/Node.js
const response = await fetch('${n[r]}/create-store', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer your-api-key',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    merchant_id: 'merchant_123',
    store_name: 'My Crypto Store',
    store_description: 'Online electronics store',
    callback_url: 'https://mystore.com/webhook'
  })
});

const store = await response.json();
console.log('Store created:', store);`,python:`# Create Store - Python
import requests

url = '${n[r]}/create-store'
headers = {
    'Authorization': 'Bearer your-api-key',
    'Content-Type': 'application/json'
}
data = {
    'merchant_id': 'merchant_123',
    'store_name': 'My Crypto Store',
    'store_description': 'Online electronics store',
    'callback_url': 'https://mystore.com/webhook'
}

response = requests.post(url, headers=headers, json=data)
store = response.json()
print('Store created:', store)`,response:`{
  "store_id": "store_789",
  "merchant_id": "merchant_123",
  "store_name": "My Crypto Store",
  "store_description": "Online electronics store",
  "status": "active",
  "created_at": "2024-01-15T10:00:00Z"
}`}},f=[{icon:e.jsx(A,{className:"w-6 h-6"}),title:"Payment Gateway API",description:"Create crypto payment orders and retrieve transaction certificates"},{icon:e.jsx(O,{className:"w-6 h-6"}),title:"Merchant Management API",description:"Onboard stores, manage sub-merchants, and handle commissions"},{icon:e.jsx(b,{className:"w-6 h-6"}),title:"Real-time webhooks",description:"Instant notifications for payment events with signature verification"},{icon:e.jsx(P,{className:"w-6 h-6"}),title:"Secure authentication",description:"JWT-based API authentication with comprehensive error handling"}],N=[{title:"Get API credentials",description:"Obtain your API key from the merchant dashboard",icon:e.jsx(p,{className:"w-6 h-6"})},{title:"Choose environment",description:"Use UAT for testing, Live for production",icon:e.jsx(T,{className:"w-6 h-6"})},{title:"Create your first order",description:"Make a POST request to create a crypto payment order",icon:e.jsx(E,{className:"w-6 h-6"})},{title:"Handle webhooks",description:"Set up webhook endpoints to receive payment notifications",icon:e.jsx(b,{className:"w-6 h-6"})}],k=[{event:"order.created",description:"New payment order has been created"},{event:"order.pending",description:"Payment is being processed on blockchain"},{event:"order.completed",description:"Payment has been successfully completed"},{event:"order.failed",description:"Payment has failed or expired"},{event:"order.cancelled",description:"Payment has been cancelled"}],C=[{code:"400",type:"Bad Request",description:"Invalid request parameters or missing required fields"},{code:"401",type:"Unauthorized",description:"Invalid or missing API key"},{code:"404",type:"Not Found",description:"Order or resource not found"},{code:"429",type:"Rate Limited",description:"Too many requests, please slow down"},{code:"500",type:"Server Error",description:"Internal server error, please retry"}],_=[{name:"Bitcoin",symbol:"BTC",network:"Mainnet",asset:"BTC",description:"Bitcoin network"},{name:"Ethereum",symbol:"ETH",network:"ERC20",asset:"ETH",description:"Ethereum network"},{name:"Tether",symbol:"USDT",network:"ERC20 | TRC20 | BEP20 | SPL",asset:"USDT",description:"USD-backed stablecoin"},{name:"Binance Coin",symbol:"BNB",network:"BEP20",asset:"BNB",description:"Binance Smart Chain"},{name:"USD Coin",symbol:"USDC",network:"ERC20 | SPL",asset:"USDC",description:"USD-backed stablecoin"},{name:"PAX Gold",symbol:"PAXG",network:"ERC20",asset:"PAXG",description:"Gold-backed token"},{name:"Dai",symbol:"DAI",network:"BEP20",asset:"DAI",description:"Decentralized stablecoin"}],j=async(t,a)=>{try{if(navigator.clipboard&&window.isSecureContext)await navigator.clipboard.writeText(t);else{const i=document.createElement("textarea");i.value=t,i.style.position="fixed",i.style.left="-999999px",i.style.top="-999999px",document.body.appendChild(i),i.focus(),i.select(),document.execCommand("copy"),document.body.removeChild(i)}y(a),setTimeout(()=>y(""),2e3)}catch(i){console.error("Failed to copy:",i)}},m=()=>{const t=c[o];return{curl:t.curl,javascript:t.javascript,python:t.python,response:t.response}};return e.jsxs(e.Fragment,{children:[e.jsx(S,{title:"API Documentation for Developers",description:"Integrate Ezeebit stablecoin and crypto payments into your platform with our comprehensive API. Create orders, process payments, and handle webhooks with ease.",canonicalUrl:"/developers"}),e.jsxs(s.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.3},className:"overflow-hidden -mt-20",children:[e.jsxs("section",{className:"relative min-h-[60vh] flex items-center gradient-bg pt-40",children:[e.jsx("div",{className:"absolute inset-0 bg-gradient-to-r from-primary-600/10 to-secondary-600/10"}),e.jsx("div",{className:"container-custom relative z-10",children:e.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-12 items-center",children:[e.jsxs(s.div,{initial:{opacity:0},animate:{opacity:1},transition:{duration:.4},className:"text-center lg:text-left",children:[e.jsxs("h1",{className:"text-4xl lg:text-5xl font-display font-bold text-neutral-900 mb-6",children:["Ezeebit ",e.jsx("span",{className:"text-gradient",children:"API"})," documentation"]}),e.jsx("p",{className:"text-xl text-neutral-600 mb-8",children:"Integrate stablecoin and cryptocurrency payments with our comprehensive Payment Gateway and Merchant Management APIs. Built for developers, designed for scale."}),e.jsxs("div",{className:"flex flex-col sm:flex-row gap-4 mb-8 justify-center lg:justify-start",children:[e.jsxs("a",{href:"https://merchant.ezeebit.com/#/signup",target:"_blank",rel:"noopener noreferrer",className:"btn-primary flex items-center justify-center",children:["Get API Keys",e.jsx(p,{className:"w-5 h-5 ml-2"})]}),e.jsxs("a",{href:"https://docs.ezeebit.com",target:"_blank",rel:"noopener noreferrer",className:"btn-secondary flex items-center justify-center",children:["Full Documentation",e.jsx(g,{className:"w-5 h-5 ml-2"})]})]}),e.jsxs("div",{className:"flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-6",children:[e.jsx("span",{className:"text-sm font-medium text-neutral-700",children:"Environment:"}),e.jsxs("div",{className:"flex bg-neutral-100 rounded-lg p-1",children:[e.jsx("button",{onClick:()=>h("uat"),className:`px-4 py-2 rounded-md text-sm font-medium transition-all ${r==="uat"?"bg-orange-500 text-white shadow-sm":"text-neutral-600 hover:text-neutral-900"}`,children:"UAT (Testing)"}),e.jsx("button",{onClick:()=>h("live"),className:`px-4 py-2 rounded-md text-sm font-medium transition-all ${r==="live"?"bg-green-500 text-white shadow-sm":"text-neutral-600 hover:text-neutral-900"}`,children:"Live (Production)"})]})]}),e.jsx("div",{className:"block lg:hidden mt-6",children:e.jsxs("div",{className:"bg-gray-900 rounded-lg p-4 text-green-400 font-mono text-sm overflow-x-auto",children:[e.jsxs("div",{className:"flex items-center justify-between mb-4",children:[e.jsxs("div",{className:"flex space-x-2",children:[e.jsx("div",{className:"w-3 h-3 bg-red-500 rounded-full"}),e.jsx("div",{className:"w-3 h-3 bg-yellow-500 rounded-full"}),e.jsx("div",{className:"w-3 h-3 bg-green-500 rounded-full"})]}),e.jsx("span",{className:"text-neutral-400",children:"API Terminal"})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsxs("div",{children:[e.jsx("span",{className:"text-blue-400",children:"$"})," curl -X POST ",n[r],"/create-order"]}),e.jsx("div",{className:"text-neutral-400",children:"✓ Order created successfully"}),e.jsxs("div",{children:[e.jsx("span",{className:"text-blue-400",children:"$"})," ",e.jsx("span",{className:"animate-pulse",children:"|"})]})]})]})}),e.jsxs("div",{className:"flex flex-wrap items-center justify-center lg:justify-start gap-4 lg:gap-6 text-sm text-neutral-500 mt-6",children:[e.jsxs("div",{className:"flex items-center",children:[e.jsx(l,{className:"w-4 h-4 text-primary-500 mr-2"}),"RESTful API"]}),e.jsxs("div",{className:"flex items-center",children:[e.jsx(l,{className:"w-4 h-4 text-primary-500 mr-2"}),"JWT Authentication"]}),e.jsxs("div",{className:"flex items-center",children:[e.jsx(l,{className:"w-4 h-4 text-primary-500 mr-2"}),"Webhook Support"]})]})]}),e.jsx(s.div,{initial:{opacity:0},animate:{opacity:1},transition:{duration:.4,delay:.1},className:"relative hidden lg:block",children:e.jsxs("div",{className:"bg-gray-900 rounded-lg p-6 text-green-400 font-mono text-sm overflow-x-auto",children:[e.jsxs("div",{className:"flex items-center justify-between mb-4",children:[e.jsxs("div",{className:"flex space-x-2",children:[e.jsx("div",{className:"w-3 h-3 bg-red-500 rounded-full"}),e.jsx("div",{className:"w-3 h-3 bg-yellow-500 rounded-full"}),e.jsx("div",{className:"w-3 h-3 bg-green-500 rounded-full"})]}),e.jsx("span",{className:"text-neutral-400",children:"API Terminal"})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsxs("div",{children:[e.jsx("span",{className:"text-blue-400",children:"$"})," curl -X POST ",n[r],"/create-order"]}),e.jsx("div",{className:"text-neutral-400",children:"✓ Order created successfully"}),e.jsxs("div",{children:[e.jsx("span",{className:"text-blue-400",children:"$"})," ",e.jsx("span",{className:"animate-pulse",children:"|"})]})]})]})})]})})]}),e.jsx("section",{className:"section-padding bg-white",children:e.jsxs("div",{className:"container-custom",children:[e.jsxs(s.div,{initial:{opacity:0},whileInView:{opacity:1},viewport:{once:!0,amount:.1},transition:{duration:.3},className:"text-center mb-16",children:[e.jsx("h2",{className:"text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4",children:"Quick start guide"}),e.jsx("p",{className:"text-xl text-neutral-600 max-w-3xl mx-auto",children:"Get up and running with the Ezeebit API in minutes."})]}),e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8",children:N.map((t,a)=>e.jsxs(s.div,{initial:{opacity:0},whileInView:{opacity:1},viewport:{once:!0,amount:.1},transition:{duration:.3,delay:a*.05},className:"text-center",children:[e.jsx("div",{className:"w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 text-primary-500",children:t.icon}),e.jsxs("div",{className:"text-sm font-semibold text-primary-500 mb-2",children:["STEP ",a+1]}),e.jsx("h3",{className:"text-xl font-semibold text-neutral-900 mb-3",children:t.title}),e.jsx("p",{className:"text-neutral-600",children:t.description})]},t.title))})]})}),e.jsx("section",{className:"section-padding bg-neutral-50",children:e.jsxs("div",{className:"container-custom",children:[e.jsxs(s.div,{initial:{opacity:0},whileInView:{opacity:1},viewport:{once:!0,amount:.1},transition:{duration:.3},className:"text-center mb-16",children:[e.jsx("h2",{className:"text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4",children:"Two powerful APIs"}),e.jsx("p",{className:"text-xl text-neutral-600 max-w-3xl mx-auto",children:"Everything you need for stablecoin and crypto payments and merchant management."})]}),e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8",children:f.map((t,a)=>e.jsxs(s.div,{initial:{opacity:0},whileInView:{opacity:1},viewport:{once:!0,amount:.1},transition:{duration:.3,delay:a*.05},className:"card p-6 text-center hover:-translate-y-1 hover:shadow-lg transition-all duration-300 will-change-transform",children:[e.jsx("div",{className:"w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4 text-primary-500",children:t.icon}),e.jsx("h3",{className:"text-xl font-semibold text-neutral-900 mb-3",children:t.title}),e.jsx("p",{className:"text-neutral-600",children:t.description})]},t.title))})]})}),e.jsx("section",{className:"py-8 lg:py-24 bg-white",children:e.jsxs("div",{className:"container-custom",children:[e.jsxs(s.div,{initial:{opacity:0},whileInView:{opacity:1},viewport:{once:!0,amount:.1},transition:{duration:.3},className:"text-center mb-8 lg:mb-16",children:[e.jsx("h2",{className:"text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4",children:"API examples"}),e.jsx("p",{className:"text-xl text-neutral-600 max-w-3xl mx-auto",children:"Interactive examples for key API endpoints."})]}),e.jsx("div",{className:"flex justify-center mb-6 lg:mb-8",children:e.jsx("div",{className:"flex bg-neutral-100 rounded-lg p-1 overflow-x-auto",children:Object.entries(c).map(([t,a])=>e.jsx("button",{onClick:()=>v(t),className:`px-3 py-2 lg:px-4 lg:py-3 rounded-md font-medium transition-all whitespace-nowrap text-sm lg:text-base ${o===t?"bg-primary-500 text-white shadow-sm":"text-neutral-600 hover:text-neutral-900"}`,children:a.title},t))})}),e.jsxs(s.div,{initial:{opacity:0,y:5},animate:{opacity:1,y:0},transition:{duration:.2},className:"max-w-6xl mx-auto",children:[e.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8",children:[e.jsx("div",{className:"card p-0 overflow-hidden min-w-0 bg-gray-800",children:e.jsxs("div",{className:"text-white p-3 lg:p-4 min-w-0 h-full",children:[e.jsxs("div",{className:"flex items-center justify-between mb-4",children:[e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(z,{className:"w-5 h-5 text-neutral-400"}),e.jsx("span",{className:"text-gray-300",children:"Request"}),e.jsx("span",{className:`px-2 py-1 rounded text-xs font-medium ${c[o].method==="POST"?"bg-green-600":"bg-blue-600"}`,children:c[o].method})]}),e.jsxs("button",{onClick:()=>j(m().curl,"request"),className:"flex items-center text-neutral-400 hover:text-white transition-colors",children:[e.jsx(w,{className:"w-4 h-4 mr-1"}),u==="request"?"Copied!":"Copy"]})]}),e.jsxs("div",{className:"space-y-3 lg:space-y-4",children:[e.jsxs("div",{children:[e.jsx("h4",{className:"text-sm font-medium text-gray-300 mb-2",children:"cURL"}),e.jsx("pre",{className:"text-xs lg:text-sm overflow-x-auto whitespace-pre-wrap break-all bg-gray-900 p-2 lg:p-3 rounded",children:e.jsx("code",{children:m().curl})})]}),e.jsxs("div",{children:[e.jsx("h4",{className:"text-sm font-medium text-gray-300 mb-2",children:"JavaScript"}),e.jsx("pre",{className:"text-xs lg:text-sm overflow-x-auto whitespace-pre-wrap break-all bg-gray-900 p-2 lg:p-3 rounded",children:e.jsx("code",{children:m().javascript})})]})]})]})}),e.jsx("div",{className:"card p-0 overflow-hidden min-w-0 bg-gray-800",children:e.jsxs("div",{className:"text-white p-3 lg:p-4 min-w-0 h-full",children:[e.jsxs("div",{className:"flex items-center justify-between mb-4",children:[e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(l,{className:"w-5 h-5 text-green-400"}),e.jsx("span",{className:"text-gray-300",children:"Response"}),e.jsx("span",{className:"px-2 py-1 bg-green-600 rounded text-xs font-medium",children:"200 OK"})]}),e.jsxs("button",{onClick:()=>j(m().response,"response"),className:"flex items-center text-neutral-400 hover:text-white transition-colors",children:[e.jsx(w,{className:"w-4 h-4 mr-1"}),u==="response"?"Copied!":"Copy"]})]}),e.jsx("pre",{className:"text-xs lg:text-sm overflow-x-auto whitespace-pre-wrap break-all bg-gray-900 p-2 lg:p-3 rounded",children:e.jsx("code",{children:m().response})})]})})]}),e.jsx("div",{className:"mt-4 lg:mt-6 p-3 lg:p-4 bg-blue-50 rounded-lg",children:e.jsxs("p",{className:"text-blue-800",children:[e.jsxs("strong",{children:[c[o].title,":"]})," ",c[o].description]})})]},o)]})}),e.jsx("section",{className:"section-padding bg-neutral-50",children:e.jsxs("div",{className:"container-custom",children:[e.jsxs(s.div,{initial:{opacity:0},whileInView:{opacity:1},viewport:{once:!0,amount:.1},transition:{duration:.3},className:"text-center mb-12",children:[e.jsx("h2",{className:"text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4",children:"Supported cryptos & networks"}),e.jsx("p",{className:"text-xl text-neutral-600 max-w-3xl mx-auto",children:"Accept payments in multiple cryptocurrencies across different networks."})]}),e.jsxs("div",{className:"grid grid-cols-[repeat(2,minmax(0,1fr))] md:grid-cols-[repeat(4,minmax(0,1fr))] gap-4 auto-rows-fr",children:[_.slice(0,7).map((t,a)=>e.jsxs(s.div,{initial:{opacity:0},whileInView:{opacity:1},viewport:{once:!0,amount:.1},transition:{duration:.3,delay:a*.03},className:"card p-4 flex flex-col items-center justify-center space-y-1 text-center overflow-hidden",children:[e.jsx("div",{className:"w-8 h-8 flex items-center justify-center flex-shrink-0",children:e.jsx("img",{src:`/${t.symbol.toLowerCase()}-logo.svg`,alt:`${t.symbol} logo`,className:"w-full h-full object-contain"})}),e.jsxs("div",{className:"text-center w-full overflow-hidden",children:[e.jsx("div",{className:"font-semibold text-neutral-900 text-xs leading-tight",children:t.asset}),e.jsx("div",{className:"text-[10px] text-neutral-500 leading-tight truncate max-w-full",children:t.network}),e.jsx("div",{className:"text-[10px] text-neutral-400 truncate max-w-full",children:t.description})]})]},`${t.asset}-${t.network}`)),e.jsx(s.div,{initial:{opacity:0},whileInView:{opacity:1},viewport:{once:!0,amount:.1},transition:{duration:.3,delay:.2},className:"card p-4 flex flex-col items-center justify-center space-y-1 text-center overflow-hidden",children:e.jsx("div",{className:"text-center",children:e.jsx("div",{className:"font-semibold text-neutral-600 text-xs leading-tight",children:"More coming soon"})})})]})]})}),e.jsx("section",{className:"section-padding bg-white",children:e.jsx("div",{className:"container-custom",children:e.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-12 items-start",children:[e.jsxs(s.div,{initial:{opacity:0},whileInView:{opacity:1},viewport:{once:!0,amount:.1},transition:{duration:.3},children:[e.jsx("h2",{className:"text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-6",children:"Webhook events"}),e.jsx("p",{className:"text-lg text-neutral-600 mb-8",children:"Receive real-time notifications for payment events. All webhooks include signature verification and require a 200 OK response for acknowledgment."}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"flex items-center",children:[e.jsx(l,{className:"w-5 h-5 text-primary-500 mr-3"}),e.jsx("span",{className:"text-neutral-700",children:"Automatic retry logic"})]}),e.jsxs("div",{className:"flex items-center",children:[e.jsx(l,{className:"w-5 h-5 text-primary-500 mr-3"}),e.jsx("span",{className:"text-neutral-700",children:"HMAC signature verification"})]}),e.jsxs("div",{className:"flex items-center",children:[e.jsx(l,{className:"w-5 h-5 text-primary-500 mr-3"}),e.jsx("span",{className:"text-neutral-700",children:"Delivery status monitoring"})]})]})]}),e.jsxs(s.div,{initial:{opacity:0},whileInView:{opacity:1},viewport:{once:!0,amount:.1},transition:{duration:.3,delay:.1},className:"card p-6",children:[e.jsx("h3",{className:"text-lg font-semibold text-neutral-900 mb-4",children:"Available Events"}),e.jsx("div",{className:"space-y-3",children:k.map(t=>e.jsxs("div",{className:"flex items-start",children:[e.jsx("code",{className:"bg-neutral-100 px-2 py-1 rounded text-sm font-mono text-primary-500 mr-3 mt-0.5",children:t.event}),e.jsx("span",{className:"text-neutral-600 text-sm",children:t.description})]},t.event))})]})]})})}),e.jsx("section",{className:"section-padding bg-neutral-50",children:e.jsxs("div",{className:"container-custom",children:[e.jsxs(s.div,{initial:{opacity:0},whileInView:{opacity:1},viewport:{once:!0,amount:.1},transition:{duration:.3},className:"text-center mb-12",children:[e.jsx("h2",{className:"text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-4",children:"Error handling"}),e.jsx("p",{className:"text-xl text-neutral-600 max-w-3xl mx-auto",children:"Standardized error responses with clear codes and actionable messages."})]}),e.jsx("div",{className:"max-w-4xl mx-auto",children:e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",children:C.map((t,a)=>e.jsxs(s.div,{initial:{opacity:0},whileInView:{opacity:1},viewport:{once:!0,amount:.1},transition:{duration:.3,delay:a*.03},className:"card p-4",children:[e.jsxs("div",{className:"flex items-center justify-between mb-2",children:[e.jsx("span",{className:`px-2 py-1 rounded text-sm font-mono ${t.code.startsWith("2")?"bg-green-100 text-green-700":t.code.startsWith("4")?"bg-yellow-100 text-yellow-700":"bg-red-100 text-red-700"}`,children:t.code}),e.jsx(I,{className:"w-4 h-4 text-neutral-400"})]}),e.jsx("h4",{className:"font-semibold text-neutral-900 mb-1",children:t.type}),e.jsx("p",{className:"text-sm text-neutral-600",children:t.description})]},t.code))})})]})}),e.jsx("section",{className:"section-padding bg-primary-600 text-white",children:e.jsx("div",{className:"container-custom text-center",children:e.jsxs(s.div,{initial:{opacity:0},whileInView:{opacity:1},viewport:{once:!0,amount:.1},transition:{duration:.3},children:[e.jsx("h2",{className:"text-3xl lg:text-4xl font-display font-bold text-white mb-4",children:"Ready to start building?"}),e.jsx("p",{className:"text-xl mb-8 max-w-2xl mx-auto opacity-90",children:"Get your API keys and start integrating stablecoin and crypto payments today. Full documentation and sandbox environment included."}),e.jsxs("div",{className:"flex flex-col sm:flex-row gap-4 justify-center",children:[e.jsxs("a",{href:"https://merchant.ezeebit.com/#/signup",target:"_blank",rel:"noopener noreferrer",className:"bg-white text-primary-600 hover:bg-neutral-100 font-medium px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center",children:["Get API Keys",e.jsx(p,{className:"w-5 h-5 ml-2 inline"})]}),e.jsxs("a",{href:"https://docs.ezeebit.com",target:"_blank",rel:"noopener noreferrer",className:"border-2 border-white text-white hover:bg-white hover:text-primary-600 font-medium px-8 py-4 rounded-lg transition-all duration-200 flex items-center justify-center",children:["Full Documentation",e.jsx(g,{className:"w-5 h-5 ml-2 inline"})]})]})]})})})]})]})};export{$ as default};
