/*
 * This file is part of KubeSphere Console.
 * Copyright (C) 2019 The KubeSphere Console Authors.
 *
 * KubeSphere Console is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * KubeSphere Console is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with KubeSphere Console.  If not, see <https://www.gnu.org/licenses/>.
 */

import React from 'react'
import { get, set } from 'lodash'
import { Form } from 'components/Base'
import { CardSelect } from 'components/Inputs'
import { MODULE_KIND_MAP, PROVISIONERS } from 'utils/constants'

import styles from './index.scss'

export default class ProvisionerSettings extends React.Component {
  constructor(props) {
    super(props)

    const { provisioner = PROVISIONERS[0].value } = this.formTemplate
    set(this.formTemplate, 'provisioner', provisioner)

    this.state = {
      provisioner,
    }
  }

  get formTemplate() {
    const { formTemplate, module } = this.props
    return get(formTemplate, MODULE_KIND_MAP[module], formTemplate)
  }

  provisionersOptions = [
    ...PROVISIONERS,
    { label: t('Custom'), value: '', icon: 'hammer' },
  ]

  changeProvisioner = provisioner => {
    this.setState(
      {
        provisioner,
      },
      this.updateParams
    )
  }

  updateParams() {
    this.formTemplate.parameters = {}
  }

  render() {
    const { formRef } = this.props
    const { provisioner } = this.state
    const { description } =
      PROVISIONERS.find(({ value }) => value === provisioner) || {}

    return (
      <Form data={this.formTemplate} ref={formRef}>
        <Form.Item
          label={
            <div className={styles.provisioner}>
              <h3>{t('CHOOSE_STORAGE_SYSTEM_TIP')}</h3>
              <p>{t('PROVISIONER_DEPENDENCE_DESC')}</p>
            </div>
          }
        >
          <CardSelect
            onChange={this.changeProvisioner}
            name="provisioner"
            options={this.provisionersOptions}
          />
        </Form.Item>
        <p
          className={styles.description}
          dangerouslySetInnerHTML={{
            __html: t(description),
          }}
        />
      </Form>
    )
  }
}
