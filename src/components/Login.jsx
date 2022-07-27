import React from "react";
import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
const Login = ({setAuth}) => {

  const onFinish = async (values) => {
    

    try {
        const body = values;
        console.log(body);
        const response = await fetch(
          "https://kritserver1.herokuapp.com/auth/login",
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(body),
          }
        );
  
        const parseRes = await response.json();
        
        if(parseRes.token){
          localStorage.setItem("token", parseRes.token);
          setAuth(true);
          toast.success("Login successfully");
          
        } else{
          setAuth(false);
          toast.error(parseRes);
        }
  
  
      } catch (err) {
        console.error(err.message);
      }

      window.location.reload();

  };

  return (
    <div className="login">
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 10,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          label="email"
          name="email"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="password"
          name="password"
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 12,
            span: 12,
          }}
        >
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 12,
            span: 12,
          }}
        >
          <Link to="/register">Register</Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
