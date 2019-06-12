import React, { Component } from 'react';
import {Tabs, Tab, FormText, Row, Nav, Button, ButtonToolbar, OverlayTrigger, Popover, Tooltip} from 'react-bootstrap'
import TabItem from "./TabItem";
import { enableRipple } from '@syncfusion/ej2-base';
import {TreeViewComponent} from "@syncfusion/ej2-react-navigations";
import {MDBIcon} from "mdbreact";
enableRipple(true);


class SessionPanel extends Component{

    icons = [
        {id:"edit",icon:"edit"},
        {id:"copy",icon:"copy"},
        {id:"paste",icon:"paste"},
        {id:"cut",icon:"cut"},
        {id:"Add Folder",icon:"folder-plus"},
        {id:"Delete Folder",icon:"folder-minus"}];
    constructor() {
        super(...arguments);
        // define the array of data
        this.hierarchicalData = [
            { id: '01', name: 'Local Disk (C:)', expanded: true,
                subChild: [
                    {
                        id: '01-01', name: 'Program Files',
                        subChild: [
                            { id: '01-01-01', name: '7-Zip' },
                            { id: '01-01-02', name: 'Git' },
                            { id: '01-01-03', name: 'IIS Express' },
                        ]
                    },
                    {
                        id: '01-02', name: 'Users', expanded: true,
                        subChild: [
                            { id: '01-02-01', name: 'Smith' },
                            { id: '01-02-02', name: 'Public' },
                            { id: '01-02-03', name: 'Admin' },
                        ]
                    },
                    {
                        id: '01-03', name: 'Windows',
                        subChild: [
                            { id: '01-03-01', name: 'Boot' },
                            { id: '01-03-02', name: 'FileManager' },
                            { id: '01-03-03', name: 'System32' },
                        ]
                    },
                ]
            },
            {
                id: '02', name: 'Local Disk (D:)',
                subChild: [
                    {
                        id: '02-01', name: 'Personals',
                        subChild: [
                            { id: '02-01-01', name: 'My photo.png' },
                            { id: '02-01-02', name: 'Rental document.docx' },
                            { id: '02-01-03', name: 'Pay slip.pdf' },
                        ]
                    },
                    {
                        id: '02-02', name: 'Projects',
                        subChild: [
                            { id: '02-02-01', name: 'ASP Application' },
                            { id: '02-02-02', name: 'TypeScript Application' },
                            { id: '02-02-03', name: 'React Application' },
                        ]
                    },
                    {
                        id: '02-03', name: 'Office',
                        subChild: [
                            { id: '02-03-01', name: 'Work details.docx' },
                            { id: '02-03-02', name: 'Weekly report.docx' },
                            { id: '02-03-03', name: 'Wish list.csv' },
                        ]
                    },
                ]
            },
            {
                id: '03', name: 'Local Disk (E:)', icon: 'folder',
                subChild: [
                    {
                        id: '03-01', name: 'Pictures',
                        subChild: [
                            { id: '03-01-01', name: 'Wind.jpg' },
                            { id: '03-01-02', name: 'Stone.jpg' },
                            { id: '03-01-03', name: 'Home.jpg' },
                        ]
                    },
                    {
                        id: '03-02', name: 'Documents',
                        subChild: [
                            { id: '03-02-01', name: 'Environment Pollution.docx' },
                            { id: '03-02-02', name: 'Global Warming.ppt' },
                            { id: '03-02-03', name: 'Social Network.pdf' },
                        ]
                    },
                    {
                        id: '03-03', name: 'Study Materials',
                        subChild: [
                            { id: '03-03-01', name: 'UI-Guide.pdf' },
                            { id: '03-03-02', name: 'Tutorials.zip' },
                            { id: '03-03-03', name: 'TypeScript.7z' },
                        ]
                    },
                ]
            }
        ];
        this.fields = { dataSource: this.hierarchicalData, id: 'id', text: 'name', child: 'subChild' };
    }

    render() {
        return(
            <div className={"sessionPanel"}>
                <Tabs style={{width:"100%"}} id="controlled-tab-example">
                    <Tab eventKey="files" title="Files">
                        <ButtonToolbar>
                            {this.icons.map(placement => (
                                <OverlayTrigger key={placement.id} placement={placement.id}
                                    overlay={
                                        <Tooltip id={`tooltip-${placement.id}`}>{placement.id}</Tooltip>
                                    }>
                                    <Button variant={"link"}><MDBIcon id={placement.id} icon={placement.icon} className={"icons"}/></Button>
                                </OverlayTrigger>
                            ))}
                        </ButtonToolbar>
                        <TreeViewComponent
                            fields={this.fields}
                            allowEditing={true}
                            allowMultiSelection={true}
                            allowDragAndDrop={true}
                            style={{color:"white"}}
                        />
                    </Tab>
                    <Tab eventKey="users" title="Users">
                        <Row>
                            <Nav variant="pills" className="flex-column">
                                {this.props.items.map((item)=> <TabItem img={item.img} username={item.username} permissions={item.permissions}/>)}
                            </Nav>
                        </Row>
                    </Tab>
                </Tabs>
            </div>
        );
    }
}


export default SessionPanel;