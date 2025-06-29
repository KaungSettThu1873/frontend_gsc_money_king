import React, { useContext, useEffect, useState } from 'react';
import { LanguageContext } from '../../contexts/LanguageContext';
import { Spinner } from 'react-bootstrap';
import { IoGameController } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { GameContext } from '../../contexts/GameContext';
import BASE_URL from '../../hooks/baseUrl';

export default function ProviderList({ typeCode, type }) {
    const { content } = useContext(LanguageContext);
    const { updateType, updateProvider } = useContext(GameContext);
    const navigate = useNavigate();

    const [providers, setProviders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (typeCode) {
            setLoading(true);
            fetch(`${BASE_URL}/providers/${typeCode}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                setProviders(data.data || []);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching providers:', error);
                setLoading(false);
            });
        }
    }, [typeCode]);

    if (loading) return <Spinner animation="border" />;

    return (
    <div className='row d-flex'>
    {providers.length === 0 ? (
        <p className='text-center'>{content?.no_data}</p>

    ) : (
        providers.map((item, index) => (
            <div
                key={index}
                className="col-4 col-sm-4 col-md-4 col-lg-2 cursor-pointer mb-2 px-1 "
            >
                <div className="gold-card rounded-4">
                    <div
                        style={{
                            width: "100%",
                            aspectRatio: "1 / 1",
                            overflow: "hidden",
                            borderTopLeftRadius: "1rem",
                            borderTopRightRadius: "1rem",
                        }}
                    >
                        <img
                            src={ item.image}
                            alt=""
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                            }}
                        />
                    </div>
                    <div
                        className="px-3   text-center"
                        style={{
                            backgroundColor: "rgba(0, 0, 0, 0.7)",
                            color: "#fff",
                            borderRadius: "200px",
                            marginTop: "3px"
                        }}
                    >
                        <h6
                            className="mb-1"
                            style={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                fontSize: "13px",
                            }}
                        >
                            {item.product_name}
                        </h6>
                    </div>
                    <div
                        className="gameCardLgBtn position-absolute bottom-0 start-50 translate-middle-x mb-2 px-3 py-1 rounded-pill shadow"
                        style={{
                            background: "linear-gradient(90deg, #FFD700, #FFA500)",
                            color: "#000",
                            fontWeight: "600",
                            fontSize: "12px",
                            cursor: "pointer",
                        }}
                        onClick={() => {
                            navigate(`/?type=${type?.id}&provider=${item.id}`);
                            updateType(type.id);
                            updateProvider(item.id);
                        }}
                    >
                        {content?.btn?.go_to_list}
                    </div>
                </div>
            </div>
        ))
    )}
</div>
    );
}
