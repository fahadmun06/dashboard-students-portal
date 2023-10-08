import './Sidebar.scss'
import React from 'react'
import { Link, Outlet } from 'react-router-dom';
import { Divider, Layout, Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';


export default function SidebarMenu() {

    return (
        <>
            <main>
                <Layout className='bg-light layout'>
                    <Sider
                        breakpoint="lg"
                        collapsedWidth="0"
                        style={{
                            minHeight: "100vh",
                        }}
                    >
                        <div className="demo-logo-vertical m-4" />
                        <span className={`text-light float-left fs-5 fw-bold`}>Dashboard
                        </span>
                        <Menu
                            className='mt-5'
                            defaultSelectedKeys={['1']}
                            mode="inline"
                            theme='dark'
                            items={[
                                {
                                    key: '1',
                                    icon: <i className="fa-solid fa-note-sticky"></i>,
                                    label: <Link to='/charts' className='text-decoration-none'>Dashboard</Link>,
                                },
                                {
                                    key: '2',
                                    icon: <i className="fa-solid fa-forward-fast"></i>,
                                    label: <Link to='/students-data' className='text-decoration-none'>Total Students</Link>
                                },
                                {
                                    key: '3',
                                    icon: <i className="fa-solid fa-list"></i>,
                                    label: <Link to='/courses' className='text-decoration-none'>All Courses</Link>,
                                },
                                {
                                    key: '4',
                                    icon: <i className="fa-solid fa-note-sticky"></i>,
                                    label: <Link to='/attendence' className='text-decoration-none'>Attendence</Link>,
                                },

                            ]}
                        />
                    </Sider>
                    <Layout>
                        <div className='mt-4'>
                            <span className={`text-dark fs-2 fw-bold layout`} style={{ marginLeft: 30 }}>SMIT Admin Panel</span>
                        </div>
                        <Content className='content-home'
                            style={{
                                overflow: "auto",
                                backgroundColor: "white",
                                boxShadow: "rgba(0, 0, 0, 0.30) 0px 5px 15px"
                            }}
                        >
                            <Outlet />
                        </Content>
                    </Layout>
                </Layout>
            </main>
        </>
    )
}
