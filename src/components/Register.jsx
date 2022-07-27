import React from 'react'
import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import axios from "axios" ;

const Register = ({setAuth}) => {
  const onFinish = async (values) => {
    

    try {
        const body = values;
        const response = await fetch(
          "https://kritserver1.herokuapp.com/auth/register",
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(body),
          }
        );
        const parseRes = await response.json();

        console.log(parseRes);
        
        if(parseRes.token){
          localStorage.setItem("token", parseRes.token);
          setAuth(true);
          toast.success("Login successfully");
          window.location.reload();
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
            Register
          </Button>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 12,
            span: 12,
          }}
        >
          <Link to="/login">Login</Link>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Register