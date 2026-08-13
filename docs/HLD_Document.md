# High-Level Design Document
## Kapture Collections Voicebot - "Maya"

### 1. Overview
This document describes the architecture and design of Maya, an automated outbound voice agent for collections.

### 2. Architecture Diagram

``mermaid
sequenceDiagram
    autonumber
    actor Customer
    participant Telephony as Telephony/SIP
    participant Vapi as Vapi Engine
    participant STT as Deepgram STT
    participant LLM as GPT-4o (Orchestrator)
    participant Server as Mock Webhook API
    participant TTS as ElevenLabs TTS

    Customer->>Telephony: Answers Call
    Telephony->>Vapi: Stream Audio
    Vapi->>STT: Real-time Audio Stream
    STT-->>Vapi: Transcribed Text Stream

    rect rgb(240, 240, 240)
        note over Vapi, LLM: Auth Phase (No Debt Disclosed)
        Vapi->>LLM: Send Conversation State + Transcript
        LLM-->>Vapi: Request Verification
        Vapi->>TTS: Synthesize Speech
        TTS-->>Customer: Play Audio
        Customer->>Vapi: Speaks Verification Code
        Vapi->>LLM: Transcript
        LLM->>Server: Tool Call: verify_customer
        Server-->>LLM: Response: { verified: true }
    end

    rect rgb(220, 245, 220)
        note over Vapi, LLM: Collections & Negotiation Phase
        LLM-->>Vapi: Disclose Debt & Ask PTP
        Vapi->>TTS: Audio Output
        TTS-->>Customer: Play Audio
        Customer->>Vapi: "I will pay this Friday"
        LLM->>Server: Tool Call: log_promise_to_pay
        Server-->>LLM: Response: { status: "SUCCESS" }
        LLM->>Server: Tool Call: send_payment_link
        Server-->>LLM: Response: { link_sent: true }
    end

    LLM-->>Vapi: Final Polite Goodbye
    Vapi->>Customer: End Call
