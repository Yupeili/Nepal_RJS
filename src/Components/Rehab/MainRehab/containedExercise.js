import React from 'react';

import { Button, WingBlank, Card, WhiteSpace, Tabs } from 'antd-mobile';
import { Link } from 'react-router-dom';


const ContainedExercises = (props) => {
    return (
        <WingBlank size="lg">
            {props.rehab.map((rehab, key) => (
                <div key={key}>
                    <h2>{rehab.rehab_category}</h2>
                    <WhiteSpace />
                    {rehab.data.map((data, key1) => (
                        <Card key={key1}>
                            <Link to={`/rehab`} className="link-highlight">
                                <Card.Header
                                    title={<span style={{ whiteSpace: "nowrap" }}>{data.name}</span>}
                                />
                            </Link>
                            <Card.Body style={{ textAlign: "center" }}>
                                <img style={{ borderStyle: "solid", borderColor: "#f5f5f9", borderWidth: "1px", borderRadius: "5px" }} src={`https://nepal.sk8tech.io/wp-content/uploads/2018/10/Icon-9.jpg`} height="120px" width="200px" alt="work" />
                            </Card.Body>
                            <Card.Footer
                                content={<div>
                                    <div style={{ textAlign: "center" }}>
                                        <Button type="warning" size="omitted" inline onClick={() => props.onChange(rehab.rehab_category, data.type, key, key1)}>Change</Button>
                                        <WhiteSpace />
                                    </div>
                                </div>
                                } />
                        </Card>
                    ))}
                    <WhiteSpace />
                </div>
            ))}
        </WingBlank>
    )
}

export default ContainedExercises;