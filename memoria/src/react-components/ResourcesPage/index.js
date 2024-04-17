import React from "react"
import Resources from "./Resources/resources"
import { Typography } from "@material-ui/core"
import {resourcesPageTitleStyle} from "./styles"
import "./styles.css"

class ResourcesPage extends React.Component {

    render() {
        return (
            <div>
                <Typography variant="h4" style={resourcesPageTitleStyle} className="resourcesPageTitle">Mental Health Resources</Typography>
                <Resources/>
            </div>
        )
    }
}

export default ResourcesPage