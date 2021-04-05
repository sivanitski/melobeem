shared_examples_for 'Webhook failed' do
  it 'returns 422 status' do
    expect(response).to have_http_status(:unprocessable_entity)
  end

  it 'returns message about missing transaction' do
    expect(JSON.parse(response.body)['message']).to eq("Couldn't find PurchaseTransaction")
  end
end

shared_examples_for 'Webhook succeed' do
  it 'returns 201 status' do
    expect(response).to have_http_status(:created)
  end

  it 'changes amount_received value in transaction from zero to amount value' do
    transaction.reload
    expect(transaction.amount).to eq(transaction.amount_received)
  end
end
