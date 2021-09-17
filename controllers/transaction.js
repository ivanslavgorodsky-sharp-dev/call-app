import Transaction from '../models/transaction';

export async function makeTransaction (userId, amount) {
    const currentBalance = await getBalance(userId);
    const balance = currentBalance.result + amount;

    const newTransaction = await Transaction.create ({userId, amount, balance});

	return newTransaction;
}

export async function getBalance(userId) {
    const transaction = await Transaction.find({ userId }).sort({_id: -1}).exec();

    if (transaction.length) {
        return {
            result: transaction[0].balance,
            error: "",
        }    
    }

    return {
        result: 0,
        error: "No transactions found",
    }
}

export async function getTransactions(userId) {
    return await Transaction.find({ userId }).sort({_id: -1}).exec();
}
