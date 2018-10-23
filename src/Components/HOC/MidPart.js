import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
	disabled: {
		textDecoration:'line-through'
	}
});


class MidPartComponent extends React.Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
		const { classes, theme } = this.props;

        return (
            <Tabs
                value={this.props.midPartTabsValue}
                onChange={this.props.handleChange}
                indicatorColor="primary"
                textColor="primary"
                scrollable
                scrollButtons="auto"
                style={{ width: '100%', height:'30px', minHeight:'30px',borderBottom:'solid 1px gray' }}
            >
                {this.props.tapBarContent.map((v, k) => {
                    return <Tab style={{minHeight:'30px'}} classes={{disabled: classes.disabled}} disabled={(k+1 > this.props.currentProcess)} disableRipple key={k} label={v} />
                })}
            </Tabs>);
    }
}

export default withStyles(styles, { withTheme: true })(MidPartComponent);
