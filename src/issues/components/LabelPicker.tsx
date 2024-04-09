import Oval from "react-loading-icons/dist/esm/components/oval"
import { useLabels } from "../../hooks/useLabels"


export const LabelPicker = () => {

  const labelsQuery = useLabels()

  if(labelsQuery.isLoading) return <Oval />
  return (
    <div>
       {
        labelsQuery.data?.map(label => (
          <span 
            key={label.id}
            className="badge rounded-pill m-1 label-picker"
            style={{ border: `1px solid ${label.color}`, color: label.color }}
          >
            {label.name}
          </span>
        ))
       }
        
    </div>
  )
}
