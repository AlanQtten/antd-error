import { Button, Form, Input, Space } from "antd";

const symbol = Symbol('symbol')

const getValue = () => {
  return `value ${new Date().getTime()}`
}

export default function App() {
  const [form] = Form.useForm()

  return <>
    <Space>
      <Button onClick={() => {
        const newValue = getValue()

        form.setFieldValue('otherKey', newValue)
        form.setFieldValue('key', { [symbol]: newValue, notSymbol: newValue })
      }}>
        set value with setFieldValue
      </Button>
      <Button onClick={() => {
        const newValue = getValue()

        form.setFieldsValue({
          otherKey: newValue,
          key: {
            [symbol]: newValue,
            notSymbol: newValue
          }
        })
      }}>
        set value with setFieldsValue
      </Button>
    </Space>
    <Form form={form}>
      <Form.Item name="otherKey">
        <Input />
      </Form.Item>

      <Form.Item name="key" rules={[{required: true}]}>
        {/* @ts-ignore */}
        <Comp />
      </Form.Item>
    </Form>
  </>
}

function Comp({ value = {} }) {

  return <Space direction="vertical">
    <div>symbol: {value[symbol]}</div>
    <div>notSymbol: {value.notSymbol}</div>
  </Space>

}