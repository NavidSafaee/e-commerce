import React from 'react'
import Accordion from 'react-bootstrap/Accordion';
import './Accordion.css'
const Accordions = () => {

  const aboutInfo = [
    {
      eventKey: '0',
      Header: 'Accordion Item #1',
      Body: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Praesentium non quo dignissimos harum voluptas aperiam odit atque consectetur! Obcaecati id dolorum fugit illo. Ad voluptate iusto officia adipisci sunt error eum. Laborum quisquam odit ad quis corrupti odio quo, ipsum dolores nesciunt veniam. Iste harum non corrupti, alias adipisci sequi magnam mollitia, praesentium quasi, asperiores nulla amet laborum laboriosam itaque dolorum quod! Esse cum ullam ab odio voluptates. Laudantium officiis ipsam quasi animi magnam. Voluptatum nulla nisi enim, consectetur quo porro nemo error velit temporibus eaque ullam voluptate doloribus. Doloribus accusantium autem consequuntur dolores odit numquam dolor corporis quisquam tempora.'
    },
    {
      eventKey: '1',
      Header: 'Accordion Item #2',
      Body: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Praesentium non quo dignissimos harum voluptas aperiam odit atque consectetur! Obcaecati id dolorum fugit illo. Ad voluptate iusto officia adipisci sunt error eum. Laborum quisquam odit ad quis corrupti odio quo, ipsum dolores nesciunt veniam. Iste harum non corrupti, alias adipisci sequi magnam mollitia, praesentium quasi, asperiores nulla amet laborum laboriosam itaque dolorum quod! Esse cum ullam ab odio voluptates. Laudantium officiis ipsam quasi animi magnam. Voluptatum nulla nisi enim, consectetur quo porro nemo error velit temporibus eaque ullam voluptate doloribus. Doloribus accusantium autem consequuntur dolores odit numquam dolor corporis quisquam tempora.'
    },
    {
      eventKey: '3',
      Header: 'Accordion Item #3',
      Body: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Praesentium non quo dignissimos harum voluptas aperiam odit atque consectetur! Obcaecati id dolorum fugit illo. Ad voluptate iusto officia adipisci sunt error eum. Laborum quisquam odit ad quis corrupti odio quo, ipsum dolores nesciunt veniam. Iste harum non corrupti, alias adipisci sequi magnam mollitia, praesentium quasi, asperiores nulla amet laborum laboriosam itaque dolorum quod! Esse cum ullam ab odio voluptates. Laudantium officiis ipsam quasi animi magnam. Voluptatum nulla nisi enim, consectetur quo porro nemo error velit temporibus eaque ullam voluptate doloribus. Doloribus accusantium autem consequuntur dolores odit numquam dolor corporis quisquam tempora.'
    },
    {
      eventKey: '4',
      Header: 'Accordion Item #4',
      Body: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Praesentium non quo dignissimos harum voluptas aperiam odit atque consectetur! Obcaecati id dolorum fugit illo. Ad voluptate iusto officia adipisci sunt error eum. Laborum quisquam odit ad quis corrupti odio quo, ipsum dolores nesciunt veniam. Iste harum non corrupti, alias adipisci sequi magnam mollitia, praesentium quasi, asperiores nulla amet laborum laboriosam itaque dolorum quod! Esse cum ullam ab odio voluptates. Laudantium officiis ipsam quasi animi magnam. Voluptatum nulla nisi enim, consectetur quo porro nemo error velit temporibus eaque ullam voluptate doloribus. Doloribus accusantium autem consequuntur dolores odit numquam dolor corporis quisquam tempora.'
    },
  ]
  return (
    <Accordion defaultActiveKey="0" className='Accordion-container'>
      {aboutInfo.map((AboutItem) => {
        return (
          <Accordion.Item eventKey={AboutItem.eventKey} >
            <Accordion.Header >{AboutItem.Header}</Accordion.Header>
            <Accordion.Body>
              {AboutItem.Body}
            </Accordion.Body>
          </Accordion.Item>
        )
      })}
    </Accordion>
  )
}

export default Accordions





