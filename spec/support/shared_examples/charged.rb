shared_examples_for 'Charged' do
  it 'returns status :ok' do
    expect(response.status).to eq 200
  end

  it 'returns json with a client secret key' do
    expect(JSON.parse(response.body)).to have_key('client_secret')
    expect(JSON.parse(response.body)['client_secret']).to start_with('pi_')
  end
end
