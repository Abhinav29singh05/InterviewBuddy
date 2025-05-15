import React from "react";

const PricingCard = () => {
    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    };

    async function loadRazorpay () {
        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
    
        if (!res){
            alert('Razropay failed to load!!')
            return 
        }
    
        const data = await fetch('http://localhost:8080/razorpay', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                amount: 100,  // 100 INR in paise
                currency: "INR"
            })
        }).then((t) => 
            t.json()
        ).catch(error => {
            console.error("Error creating order:", error);
            alert("Could not create payment order. Please try again.");
            return null;
        });
    
        if (!data) return;
        
        console.log(data);
    
        const options = {
            "key": "rzp_test_TcSyaOAtIyo5U3", // Enter the Key ID generated from the Dashboard
            "amount": data.amount.toString(), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": data.currency,
            "name": "Interview Buddy",
            "description": "Premium Plan Subscription",
            "image": "https://example.com/your_logo",
            "order_id": data.order_id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "handler": function (response) {
                // Verify payment on the server
                fetch('http://localhost:8080/verify', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature
                    })
                })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        alert("Payment Successful! Your premium subscription is now active.");
                    } else {
                        alert("Payment verification failed. Please contact support.");
                    }
                })
                .catch(error => {
                    console.error("Verification error:", error);
                    alert("Payment completed but verification failed. Please contact support with your payment ID: " + response.razorpay_payment_id);
                });
            },
            "prefill": {
                "name": "Anurag",
                "email": "",
                "contact": ""
            },
            "notes": {
                "address": "Interview Buddy"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        const paymentObject = new window.Razorpay(options); 
        paymentObject.open();
    };

  return (
    <div id="pricing" className="flex flex-col items-center py-16 px-4 bg-[#ECF0F1]">
      <h2 className="text-4xl font-bold text-[#2C3E50] mb-3 text-center">Pricing Plans</h2>
      <p className="text-[#34495E] text-lg mb-12 text-center max-w-2xl">
        Unlock the full potential of your interview preparation with our affordable premium plan
      </p>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all hover:scale-105 duration-300 max-w-md w-full border border-blue-100">
        {/* Top ribbon */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 py-1"></div>
        
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full mb-3 inline-block">
                MOST POPULAR
              </span>
              <h3 className="text-2xl font-bold text-[#2C3E50]">Premium Plan</h3>
            </div>
            <div className="text-right">
              <div className="flex items-baseline">
                <span className="text-4xl font-extrabold text-[#2C3E50]">₹1</span>
                <span className="text-gray-500 text-lg ml-1">/month</span>
              </div>
              <span className="text-xs text-green-600">Billed monthly</span>
            </div>
          </div>
          
          <div className="h-px bg-gray-200 my-6"></div>
          
          <ul className="space-y-4 mb-8">
            <li className="flex items-center text-[#34495E]">
              <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Unlimited Interview Sessions
            </li>
            <li className="flex items-center text-[#34495E]">
              <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Priority Customer Support
            </li>
            <li className="flex items-center text-[#34495E]">
              <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Detailed Analytics Dashboard
            </li>
            <li className="flex items-center text-[#34495E]">
              <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Personalized Feedback
            </li>
          </ul>
          
          <button 
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition shadow-md flex items-center justify-center"
            onClick={loadRazorpay}
          >
            <span>Get Premium Now</span>
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </button>
        </div>
        
        <div className="bg-gray-50 text-center text-sm text-gray-500 py-4 px-8 border-t border-gray-100">
          No cancellation required. Payments securely processed with Razorpay.
        </div>
      </div>
    </div>
  );
};

export default PricingCard;
