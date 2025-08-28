// backend/routes/account.js
const express = require('express');
const { authMiddleware } = require('../middleware');
const { User, Account } = require('../db');
const { default: mongoose } = require('mongoose');

const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
    const account = await Account.findOne({
        userId: req.userId
    });

    res.json({
        balance: account.balance
    })
});

router.post("/transfer", authMiddleware, async (req, res) => {
    const { amount, to } = req.body;
    const session = await mongoose.startSession();

    try {
        session.startTransaction();
        
        // Ensure amount is a valid number
        const amountNum = Number(amount);
        if (isNaN(amountNum) || amountNum <= 0) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ message: "Invalid transfer amount" });
        }

        // Step 1: Find the recipient user by username
        const recipientUser = await User.findOne({ username: to }).session(session);
        if (!recipientUser) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({ message: "Recipient not found" });
        }

        // Step 2: Get recipient's account by userId
        const recipientAccount = await Account.findOne({ userId: recipientUser._id }).session(session);
        if (!recipientAccount) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({ message: "Recipient account not found" });
        }

        // Step 3: Get sender's account
        const senderAccount = await Account.findOne({ userId: req.userId }).session(session);
        if (!senderAccount) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({ message: "Sender account not found" });
        }

        // Step 4: Check balance
        if (senderAccount.balance < amountNum) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ message: "Insufficient balance" });
        }

        // Step 5: Perform Transfer
        senderAccount.balance -= amountNum;   // Correct numeric subtraction
        recipientAccount.balance += amountNum; // Correct numeric addition

        await senderAccount.save({ session });
        await recipientAccount.save({ session });

        // Commit transaction
        await session.commitTransaction();
        session.endSession();

        res.status(200).json({
            message: "Transfer successful",
            senderBalance: senderAccount.balance,
            recipientBalance: recipientAccount.balance
        });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
});


module.exports = router;
