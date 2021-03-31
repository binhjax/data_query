/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import { ensureIsArray, QueryObjectExtras, t, tn } from '@superset-ui/core';
import React, { useEffect, useState } from 'react';
import { Select } from 'src/common/components';
import { Styles, StyledSelect } from '../common';
import { PluginFilterTimeGrainProps } from './types';

const { Option } = Select;

export default function PluginFilterTimegrain(
  props: PluginFilterTimeGrainProps,
) {
  const { data, formData, height, width, setDataMask } = props;
  const { defaultValue, currentValue, inputRef } = formData;

  const [value, setValue] = useState<string[]>(defaultValue ?? []);

  const handleChange = (values: string[] | string | undefined | null) => {
    const resultValue: string[] = ensureIsArray<string>(values);
    const [timeGrain] = resultValue;

    const extras: QueryObjectExtras = {};
    if (timeGrain) {
      extras.time_grain_sqla = timeGrain;
    }
    setValue(resultValue);
    setDataMask({
      nativeFilters: {
        extraFormData: {
          override_form_data: {
            extras,
          },
        },
        currentState: {
          value: resultValue.length ? resultValue : null,
        },
      },
    });
  };

  useEffect(() => {
    handleChange(currentValue ?? []);
  }, [JSON.stringify(currentValue)]);

  useEffect(() => {
    handleChange(defaultValue ?? []);
    // I think after Config Modal update some filter it re-creates default value for all other filters
    // so we can process it like this `JSON.stringify` or start to use `Immer`
  }, [JSON.stringify(defaultValue)]);

  const placeholderText =
    (data || []).length === 0
      ? t('No data')
      : tn('%s option', '%s options', data.length, data.length);
  return (
    <Styles height={height} width={width}>
      <StyledSelect
        allowClear
        value={value}
        placeholder={placeholderText}
        // @ts-ignore
        onChange={handleChange}
        ref={inputRef}
      >
        {(data || []).map((row: { name: string; duration: string }) => {
          const { name, duration } = row;
          return (
            <Option key={duration} value={duration}>
              {name}
            </Option>
          );
        })}
      </StyledSelect>
    </Styles>
  );
}
