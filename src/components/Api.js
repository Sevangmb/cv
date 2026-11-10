import * as React from 'react';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';

class Api extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }

  componentDidMount() {
    const that = this;
    const apiUrl =
      "https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/cv-xfzvw/service/cv/incoming_webhook/api?secret=cv";
    fetch(apiUrl)
      .then((res) => res.json())
      .then((json) => {
        that.setState({ data: json });
      });
  }
  render() {
    const result = (this.state.data || []).map(
      function (item, id) {
        return (
          <div>
            <span>{id}</span>
            &nbsp;
            <span>{item.title}</span>
            &nbsp;
            <span>{item.cast}</span>
            {
                            item.cast.map((castDetail) => {
                              return <Chip size="small" icon={<FaceIcon />} label={castDetail} variant="outlined" />;
                              
                            })
                          }
           v 
          <span>{item.runtime.$numberInt}</span>
          </div>
        );
      }
    );
    return result;
  }
}
export default Api;