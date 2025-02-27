<!--
 * @Author:
 * @Date: 2023-12-13 17:45:32
 * @LastEditors: lvzj
 * @LastEditTime: 2023-12-13 17:45:32
 * @Description: file content
 -->

# 按钮：Jbutton （保留可用，完全就是 antd 的 Button）

之前考虑 button 在 Table 和 Tree 内渲染消耗性能很大(多数据情况下明显)，启用了 Jbutton 组件，但一次展示大量数据依然性能也同样不乐观，大量数据列表的渲染应该从数据角度处理，所以 Jbutton 的存在意义不大且没有 antd 的 Button 完善，所以 Jbutton 保留可用并且改用转发 antd 的 Button 而已（Jbutton就是Button），之后建议直接使用 Button

<del>`Jbutton` 与 `Antd 的 Button` 不同在于，`Jbutton`是 span 标签渲染的，这是因为在一些列表中渲染 button 标签，数据多的情况下消耗的性能巨大，如 Table、尤其在 Tree 当中，使用 span 标签明显有提升渲染性能。</del>

antd 的 Button 没有success类型的颜色， 当type==="primary"时可以加 className = "z-btn-success" 将按钮颜色改为success类型的

<div class="z-demo-box" data-render="demo2" data-title="z-btn-success"></div>

```jsx
import {Button} from 'antd'

<Button type="primary" className="z-btn-success">按钮</Button>
```

<!-- 1、基本使用

<div class="z-demo-box" data-render="demo1" data-title="基本使用"></div>

```jsx
class Myjavascript extends ZpureComponent {
	render() {
		return (
			<span>
				<Jbutton type="default.rs">default.rs</Jbutton>
				<Jbutton type="primary">primary</Jbutton>
				<Jbutton type="success">success</Jbutton>
				<Jbutton type="danger">danger</Jbutton>
				<Jbutton type="danger" disabled>
					disabled
				</Jbutton>
				<Jbutton type="default.rs" size="small">
					default.rs
				</Jbutton>
				<Jbutton type="primary" size="small">
					primary
				</Jbutton>
				<Jbutton type="success" size="small">
					success
				</Jbutton>
				<Jbutton type="danger" size="small">
					danger
				</Jbutton>
			</span>
		);
	}
}
``` -->

<del>
<table>
	<thead>
		<tr>
			<th>参数</th>
			<th>说明</th>
			<th>类型</th>
			<th>默认值</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>type</td>
			<td>default | primary | success | danger</td>
			<td>string</td>
			<td>default</td>
		</tr>
		<tr>
			<td>size</td>
			<td>normal | small</td>
			<td>string</td>
			<td>normal</td>
		</tr>
		<tr>
			<td>onClick</td>
			<td>点击事件</td>
			<td>function</td>
			<td>--</td>
		</tr>
		<tr>
			<td>disabled</td>
			<td>禁用状态</td>
			<td>boolean</td>
			<td>false</td>
		</tr>
	</tbody>
</table>
</del>
