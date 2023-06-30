import { Analytics } from "aws-amplify";

export const AnalyticsPage = () => {
  Analytics.record({ name: 'analyticsPageVisit' })

  const onSelect = (itemName:string) => {
    Analytics.record(
      {
        name: 'itemSelect',
        attributes: {
          name: 'selectedItem',
          value: itemName
        }
      }
    )

    Analytics.record(
      {
        name: 'itemSelect',
        attributes: {
          name: 'selectedItem',
          value: itemName
        },
        data: {
          name: 'selectedItem',
          value: itemName
        },
      },
      'AWSKinesis'
    )
  }
  
  return (<>
    <h1>Analytics</h1>

    <table>
      <thead>
      </thead>
      <tbody>
        <tr>
          <td>record</td>
          <td><button onClick={ () => onSelect('Item1') }>Item1</button></td>
        </tr>
        <tr>
          <td>record</td>
          <td><button onClick={ () => onSelect('Item2') }>Item2</button></td>
        </tr>
        <tr>
          <td>record</td>
          <td><button onClick={ () => onSelect('Item3') }>Item3</button></td>
        </tr>
        <tr>
          <td>record</td>
          <td><button onClick={ () => onSelect('Item4') }>Item4</button></td>
        </tr>
      </tbody>
    </table>
  </>)
}