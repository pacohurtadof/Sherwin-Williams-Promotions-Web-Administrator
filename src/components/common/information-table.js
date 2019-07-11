import React from 'react';

const InformationTable = (props) => {
    return (
        <div>
            {props.children}
            <table className="table table-stripped text-center">
                <tbody>
                    {
                        Object.entries(props.info).map(([key, value]) => {
                            return <tr key={key}>
                                <td className="col-btn col-12">
                                    <button disabled={props.disable} type="button" id={key} className="btn btn-link sm button no-padding"
                                        onClick={() => { props.delete(key) }}>Del
                                </button>
                                </td>
                                <td className="col-lang col-12">{key}</td>
                                <td className="text-left">{value.toString().substr(0, 50) + '...'}</td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default InformationTable;