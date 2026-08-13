const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Store mock data
let mockDatabase = {
    customers: {
        'ACC-88392': {
            name: 'Rahul Sharma',
            phone: '+919999999999',
            overdueAmount: 8499,
            overdueDays: 12,
            panLast4: '1234',
            dob: '1995'
        }
    },
    ptpLogs: [],
    dispositions: []
};

// ✅ ADD THIS: Health Check Endpoint
app.get('/health', (req, res) => {
    res.json({ 
        status: 'Server is running!', 
        timestamp: new Date().toISOString() 
    });
});

// Main Webhook Endpoint
app.post('/webhook', (req, res) => {
    console.log('\n=== INCOMING WEBHOOK ===');
    console.log('Request Body:', JSON.stringify(req.body, null, 2));

    const { message } = req.body;

    if (message && message.type === 'tool-calls') {
        const toolCall = message.toolCalls[0];
        const { name, arguments: args } = toolCall.function;
        const callId = toolCall.id;

        console.log(`[TOOL CALL]: ${name}`);
        console.log(`[ARGS]:`, args);

        let result = handleToolCall(name, args);

        return res.status(200).json({
            results: [
                {
                    toolCallId: callId,
                    result: JSON.stringify(result)
                }
            ]
        });
    }

    return res.status(200).json({ status: 'acknowledged' });
});

// Handle Tool Calls
function handleToolCall(name, args) {
    let result = {};

    switch (name) {
        case 'verify_customer':
            const customer = mockDatabase.customers[args.account_id];
            if (customer) {
                const isValid = args.verification_code === customer.panLast4 || 
                               args.verification_code === customer.dob;
                result = {
                    verified: isValid,
                    customer_name: isValid ? customer.name : null,
                    message: isValid ? 'Identity verified successfully.' : 'Verification failed. Incorrect code.'
                };
            } else {
                result = {
                    verified: false,
                    message: 'Account not found.'
                };
            }
            break;

        case 'log_promise_to_pay':
            const ptpId = `PTP-${Math.floor(1000 + Math.random() * 9000)}`;
            const ptpEntry = {
                ptp_id: ptpId,
                account_id: args.account_id,
                ptp_date: args.ptp_date,
                amount: args.amount,
                created_at: new Date().toISOString()
            };
            mockDatabase.ptpLogs.push(ptpEntry);
            result = {
                success: true,
                ptp_id: ptpId,
                confirmed_date: args.ptp_date,
                amount: args.amount,
                message: 'Promise to pay logged successfully.'
            };
            break;

        case 'send_payment_link':
            result = {
                success: true,
                message: `Payment link sent successfully via ${args.channel} to registered mobile number.`,
                link: `https://payment.kapture.com/pay/${args.account_id}`
            };
            break;

        case 'mark_disposition':
            const disposition = {
                account_id: args.account_id,
                status: args.status,
                notes: args.notes || '',
                timestamp: new Date().toISOString()
            };
            mockDatabase.dispositions.push(disposition);
            result = {
                success: true,
                disposition_logged: args.status,
                timestamp: new Date().toISOString(),
                message: `Disposition ${args.status} logged.`
            };
            break;

        case 'escalate_to_agent':
            result = {
                success: true,
                ticket_id: `TKT-${Math.floor(1000 + Math.random() * 9000)}`,
                message: 'Escalated to human agent successfully.',
                reason: args.reason || 'Not specified'
            };
            break;

        default:
            result = {
                success: false,
                message: `Unknown function: ${name}`
            };
    }

    console.log(`[RESULT]:`, JSON.stringify(result, null, 2));
    return result;
}

// Start the server
app.listen(PORT, () => {
    console.log(`
    🚀 Kapture Collections Mock Server
    📡 Running on: http://localhost:${PORT}
    🔗 Webhook URL: http://localhost:${PORT}/webhook
    ✅ Health Check: http://localhost:${PORT}/health
    `);
});