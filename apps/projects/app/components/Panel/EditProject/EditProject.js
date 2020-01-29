import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, GU, TextInput } from '@aragon/ui'
import { useAragonApi } from '../../../api-react'
import { toHex } from 'web3-utils'
import { FormField } from '../../Form'
import { ipfsAdd } from '../../../utils/ipfs-helpers'


const EditProject = ({ repoId, label, description: descriptionOld }) => {
  const [ title, setTitle ] = useState(label)
  const [ description, setDescription ] = useState(descriptionOld)
  const { api } = useAragonApi()

  const updateProject = async () => {
    const hash = await ipfsAdd(
      { repoId, title, description }
    )
    api.updateProject(toHex(repoId), hash).toPromise()
  }

  return (
    <div style={{ marginTop: (3 * GU) + 'px' }}>
      <FormField
        label="Title"
        required={true}
        input={
          <TextInput
            wide
            value={title}
            onChange={e => setTitle(e.target.value)}
            aria-label="Title"
          />
        }
      />
      <FormField
        label="Description"
        input={
          <TextInput.Multiline
            name="description"
            rows="3"
            onChange={e => setDescription(e.target.value)}
            value={description}
            wide
            aria-label="Description"
          />
        }
      />
      <Button
        mode="strong"
        wide
        onClick={updateProject}
        disabled={title === ''}
      >
        Submit
      </Button>
    </div>
  )
}
EditProject.propTypes = {
  repoId: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}

// TODO: Use nodes instead of edges (the app should be adapted at some places)
export default EditProject