# kapture-collections-voicebot
Automated collections voicebot built on Vapi.ai

#The files included in it:-
kapture-collections-voicebot/
├── README.md              # Project overview
├── docs/
│   └── HLD_Document.md    # Architecture design
├── vapi/
│   ├── system_prompt.txt  # Maya's instructions
│   └── tool_definitions.json # Tool schemas
├── mock-server/
│   ├── server.js          # Webhook server
│   ├── package.json       # Dependencies
│   └── .env.example       # Environment variables
└── tests/
    └── test_cases.json    # Test scenarios

# Kapture Collections Voicebot - "Maya"

## Overview
Automated outbound voice agent for collections built on Vapi.ai.

## Features
- ✅ Identity verification before debt disclosure
- ✅ Promise-to-Pay (PTP) collection
- ✅ Payment link sending
- ✅ Call disposition logging
- ✅ RBI compliance
- ✅ <1.2 second latency

## Architecture
- **STT**: Deepgram Nova-2
- **LLM**: OpenAI GPT-4o
- **TTS**: ElevenLabs
- **Webhook**: Node.js + Express
- **Tunneling**: ngrok

## Setup Instructions

### Prerequisites
- Node.js v18+
- npm
- ngrok account

### Installation
Terminal or bash

# Clone the repository
git clone https://github.com/AbhishekMagasala1852/kapture-collections-voicebot.git

# Install dependencies
cd kapture-collections-voicebot/mock-server
npm install

# Start the server
npm start

# In another terminal, start ngrok
ngrok http 3000


Tools
verify_customer - Authenticates customer
log_promise_to_pay - Logs payment commitment
send_payment_link - Sends payment link
mark_disposition - Logs call outcome
escalate_to_agent - Escalates to human

Technologies Used
Vapi.ai - Voice agent platform
Deepgram - Speech-to-text
OpenAI GPT-4o - Conversation orchestration
ElevenLabs - Text-to-speech
Node.js - Webhook server
ngrok - Local tunneling

Author
[Abhishek Magasala]

License
MIT

text

---

## 📊 **PART 6: Create HLD Document**

Create `docs/HLD_Document.md`:

``markdown
# High-Level Design Document
## Kapture Collections Voicebot - "Maya"

### 1. Overview
Maya is an automated outbound collections agent that handles customer calls, verifies identity, discloses debt information, and collects payment commitments.

### 2. Architecture Diagram

``mermaid
sequenceDiagram
    actor Customer
    participant Telephony as Telephony/SIP
    participant Vapi as Vapi Engine
    participant STT as Deepgram STT
    participant LLM as GPT-4o
    participant Server as Webhook Server
    participant TTS as ElevenLabs TTS

    Customer->>Telephony: Answers Call
    Telephony->>Vapi: Stream Audio
    Vapi->>STT: Audio to Text
    STT-->>Vapi: Transcribed Text
    
    Note over Vapi: Authentication Phase
    
    Vapi->>LLM: Send transcript
    LLM-->>Vapi: Request verification
    Vapi->>TTS: Synthesize speech
    TTS-->>Customer: "Confirm PAN"
    Customer->>Vapi: "1234"
    Vapi->>Server: verify_customer
    Server-->>Vapi: { verified: true }
    
    Note over Vapi: Collections Phase
    
    Vapi->>LLM: Verified, disclose debt
    Vapi->>TTS: "₹8,499 overdue"
    TTS-->>Customer: Play audio
    Customer->>Vapi: "I'll pay Friday"
    Vapi->>Server: log_promise_to_pay
    Server-->>Vapi: { success: true }
    Vapi->>Server: send_payment_link
    Server-->>Vapi: { link_sent: true }
3. Technology Stack
Component	Technology	Purpose
Speech-to-Text	Deepgram Nova-2	Convert speech to text
LLM	OpenAI GPT-4o	Conversation orchestration
Text-to-Speech	ElevenLabs	Convert text to speech
Webhook Server	Node.js/Express	Handle tool calls
Tunneling	ngrok	Expose local server
4. State Machine
text
[Start] → Greeting → Verification → Disclosure → Negotiation → Closing → [End]
5. Compliance Features
Zero debt disclosure before verification

RBI calling window (8 AM - 7 PM)

DNC compliance

No third-party disclosure

6. Latency Budget
Component	Latency
STT	~200ms
LLM First Token	~400ms
TTS	~300ms
Network	~200ms
Total	<1.2s
7. Tools
Tool	Description
verify_customer	Customer identity verification
log_promise_to_pay	Log payment commitment
send_payment_link	Send payment link
mark_disposition	Log call outcome
escalate_to_agent	Escalate to human
8. Error Handling
Abusive user → 1 warning → soft hangup

Silent user → 2 re-prompts → hangup

Wrong number → log disposition → end call

text

---

## 📋 **PART 7: Submission Checklist**

Print this checklist and tick off each item:

### Documentation
- [ ] README.md created
- [ ] HLD_Document.md created
- [ ] System prompt saved in `vapi/system_prompt.txt`
- [ ] Tool definitions saved in `vapi/tool_definitions.json`
- [ ] Test cases in `tests/test_cases.json`

### Code
- [ ] `server.js` complete
- [ ] `package.json` has all dependencies
- [ ] Code pushed to GitHub

### Demo
- [ ] Loom video recorded
- [ ] Happy Path shown
- [ ] Edge Case shown
- [ ] Logs shown
- [ ] Video link ready to share

### Final
- [ ] All files organized properly
- [ ] GitHub repository is public
- [ ] Demo video is clear and under 4 minutes

---

## 🎥 **PART 8: Final Video Script**
Go through this :- https://www.loom.com/share/3cab9bec0514461d9613c466c4ae9ffe


## 🚀 **PART 9: Share Your Work**

### What to Send to Your Project Manager:

**Subject:** Kapture Collections Voicebot - Submission

**Body:**
Hi [Kapture finance],

I'm submitting the Kapture Collections Voicebot project.

📁 GitHub:https://github.com/AbhishekMagasala1852/kapture-collections-voicebot.git
🎥 Demo Video: [(https://www.loom.com/share/3cab9bec0514461d9613c466c4ae9ffe)]
📄 HLD Document: Included in GitHub

Key Features:
✅ Identity verification before debt disclosure
✅ Promise-to-Pay collection
✅ Payment link sending
✅ RBI compliance
✅ <1.2 second latency

Tools Used:

Vapi.ai for voice agent

Deepgram Nova-2 for STT

GPT-4o for conversation

ElevenLabs for TTS

Node.js for webhooks

Please let me know if you have any questions!

Best,
[Abhbishek Magasala]

text

---

## ✅ **FINAL CHECKLIST**

Before sending:

- [ ] Loom video recorded and link is working
- [ ] GitHub repository is public and has all files
- [ ] README.md is complete
- [ ] HLD document is complete
- [ ] All tools are working
- [ ] Test calls are successful
- [ ] Email is ready to send

---

## 🎯 **Quick Links You Need**

| Tool | Link |
|------|------|
| Loom | https://www.loom.com/share/3cab9bec0514461d9613c466c4ae9ffe |
| GitHub | https://github.com/AbhishekMagasala1852/kapture-collections-voicebot.git |
| Vapi | https://vapi.ai |
| Your ngrok URL | https://imminent-flick-eastbound.ngrok-free.dev |

---

**You're all set! Now go record that video and submit your project!** 🚀

Remember: Your project manager wants to see:
1. **That it works** (show the calls)
2. **How it works** (show the code)
3. **Why it's good** (show compliance)

You've done an amazing job building this! Now go impress them! 🎉
