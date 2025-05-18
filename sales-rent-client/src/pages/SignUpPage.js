import React, { useState } from 'react';
import HeaderComponent from '../components/HeaderComponent';
import './SignUp.css';

function SignUpPage() {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        phone: '',
        email: '',
        country: '',
        city: '',
        password: '',
        subscription: '',
        payment_method: '',
        card: {
            Card: '',
            Number: '',
            CVV: '',
            Expiry_Date: ''
        },
        bank_account: '',
        id_picture: ''
    });

    const countries = [
        { label: 'Country 1', value: 'Country 1' },
        { label: 'Country 2', value: 'Country 2' },
        // Add more countries as needed
    ];

    const cities = {
        'Country 1': ['City 1', 'City 2', 'City 3'],
        'Country 2': ['City A', 'City B', 'City C']
        // Add cities for each country
    };

    const handleCountryChange = (e) => {
        const country = e.target.value;
        setFormData({
            ...formData,
            country,
            city: cities[country][0] || ''
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [mainKey, subKey] = name.split('.');
            setFormData((prevState) => ({
                ...prevState,
                [mainKey]: {
                    ...prevState[mainKey],
                    [subKey]: value
                }
            }));
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handlePaymentMethodChange = (e) => {
        const { value } = e.target;
        setFormData({
            ...formData,
            payment_method: value,
            card: value === 'card' ? { Card: '', Number: '', CVV: '', Expiry_Date: '' } : {},
            bank_account: value === 'transfer' ? 'Bank Account Info' : ''
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({
            ...formData,
            id_picture: file
        });
        console.log('File uploaded:', file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);

        // Uncomment and configure the following block when ready to integrate with backend
        /*
        try {
            const response = await axios.post('/api/register', formData);
            console.log('User registered successfully:', response.data);
            // Redirect to OTP page here if needed
        } catch (error) {
            console.error('Error registering user:', error);
        }
        */
    };

    return (
        <div className="signup-container">
            <HeaderComponent />
            <form className="signup-form" onSubmit={handleSubmit}>
                <h2>Sign Up</h2>
                <div className="form-group">
                    <label>First Name:</label>
                    <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Last Name:</label>
                    <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Phone:</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Country:</label>
                    <select
                        name="country"
                        value={formData.country}
                        onChange={handleCountryChange}
                        required
                    >
                        <option value="">Select Country</option>
                        {countries.map((country) => (
                            <option key={country.value} value={country.value}>
                                {country.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>City:</label>
                    <select
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select City</option>
                        {cities[formData.country] && cities[formData.country].map((city) => (
                            <option key={city} value={city}>
                                {city}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Subscription:</label>
                    <div className="subscription-options">
                        <div
                            className={`subscription-card ${formData.subscription === 'basic' ? 'selected' : ''}`}
                            onClick={() => setFormData({ ...formData, subscription: 'basic' })}
                        >
                            <h3>Basic</h3>
                            <p>$10/month</p>
                            <ul>
                                <li>Feature 1</li>
                                <li>Feature 2</li>
                            </ul>
                        </div>
                        <div
                            className={`subscription-card ${formData.subscription === 'pro' ? 'selected' : ''}`}
                            onClick={() => setFormData({ ...formData, subscription: 'pro' })}
                        >
                            <h3>Pro</h3>
                            <p>$20/month</p>
                            <ul>
                                <li>Feature 1</li>
                                <li>Feature 2</li>
                                <li>Feature 3</li>
                            </ul>
                        </div>
                        <div
                            className={`subscription-card ${formData.subscription === 'premium' ? 'selected' : ''}`}
                            onClick={() => setFormData({ ...formData, subscription: 'premium' })}
                        >
                            <h3>Premium</h3>
                            <p>$30/month</p>
                            <ul>
                                <li>Feature 1</li>
                                <li>Feature 2</li>
                                <li>Feature 3</li>
                                <li>Feature 4</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label>Payment Method:</label>
                    <div className="payment-method">
                        <label>
                            <input
                                type="radio"
                                name="payment_method"
                                value="card"
                                checked={formData.payment_method === 'card'}
                                onChange={handlePaymentMethodChange}
                                required
                            />
                            Card
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="payment_method"
                                value="transfer"
                                checked={formData.payment_method === 'transfer'}
                                onChange={handlePaymentMethodChange}
                                required
                            />
                            Bank Transfer
                        </label>
                    </div>
                </div>
                {formData.payment_method === 'card' && (
                    <div className="card-details">
                        <div className="form-group">
                            <label>Card:</label>
                            <input
                                type="text"
                                name="card.Card"
                                value={formData.card.Card}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Number:</label>
                            <input
                                type="text"
                                name="card.Number"
                                value={formData.card.Number}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>CVV:</label>
                            <input
                                type="text"
                                name="card.CVV"
                                value={formData.card.CVV}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Expiry Date:</label>
                            <input
                                type="text"
                                name="card.Expiry_Date"
                                value={formData.card.Expiry_Date}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                )}
                {formData.payment_method === 'transfer' && (
                    <div className="form-group">
                        <label>Bank Account Information:</label>
                        <input
                            type="text"
                            name="bank_account"
                            value={formData.bank_account}
                            readOnly
                        />
                    </div>
                )}
                <div className="form-group">
                    <label>ID Picture:</label>
                    <input
                        type="file"
                        name="id_picture"
                        onChange={handleFileChange}
                        accept="image/*"
                        required
                    />
                </div>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default SignUpPage;