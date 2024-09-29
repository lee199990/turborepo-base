[@jmrepo/gismap](../README.md) / [Exports](../modules.md) / Screenshot

# Class: Screenshot

## Table of contents

### Constructors

-   [constructor](Screenshot.md#constructor)

### Properties

-   [isShooting](Screenshot.md#isshooting)
-   [map](Screenshot.md#map)
-   [shotInstance](Screenshot.md#shotinstance)

### Methods

-   [clear](Screenshot.md#clear)
-   [downloadImgComponent](Screenshot.md#downloadimgcomponent)
-   [escapeEvent](Screenshot.md#escapeevent)
-   [getCanvas](Screenshot.md#getcanvas)
-   [getScreenShot](Screenshot.md#getscreenshot)
-   [getScreenShotUrl](Screenshot.md#getscreenshoturl)
-   [screenShot](Screenshot.md#screenshot)
-   [shotInstanceInit](Screenshot.md#shotinstanceinit)

## Constructors

### constructor

• **new Screenshot**(`map`): [`Screenshot`](Screenshot.md)

#### Parameters

| Name  | Type              |
| :---- | :---------------- |
| `map` | `MapInstanceType` |

#### Returns

[`Screenshot`](Screenshot.md)

#### Defined in

lib/utils/screenshot/Screenshot.ts:22

## Properties

### isShooting

• `Private` **isShooting**: `boolean` = `false`

#### Defined in

lib/utils/screenshot/Screenshot.ts:18

---

### map

• `Private` **map**: `MapInstanceType`

#### Defined in

lib/utils/screenshot/Screenshot.ts:22

---

### shotInstance

• `Private` **shotInstance**: `MaplibreScreenshot` \| `OpenlayersScreenshot`

#### Defined in

lib/utils/screenshot/Screenshot.ts:20

## Methods

### clear

▸ **clear**(): `void`

#### Returns

`void`

#### Defined in

lib/utils/screenshot/Screenshot.ts:160

---

### downloadImgComponent

▸ **downloadImgComponent**(`dataUrl`): `void`

下载图片组件。

#### Parameters

| Name      | Type     | Description      |
| :-------- | :------- | :--------------- |
| `dataUrl` | `string` | 图片的数据 URL。 |

#### Returns

`void`

-   同步状态到上一层，方便处理后续操作

#### Defined in

lib/utils/screenshot/Screenshot.ts:63

---

### escapeEvent

▸ **escapeEvent**(`event`): `void`

#### Parameters

| Name    | Type  |
| :------ | :---- |
| `event` | `any` |

#### Returns

`void`

#### Defined in

lib/utils/screenshot/Screenshot.ts:105

---

### getCanvas

▸ **getCanvas**(): `null` \| `HTMLCanvasElement`

#### Returns

`null` \| `HTMLCanvasElement`

#### Defined in

lib/utils/screenshot/Screenshot.ts:149

---

### getScreenShot

▸ **getScreenShot**(): `Promise`\<`void`\>

获取选中地图视图的截图并下载。

#### Returns

`Promise`\<`void`\>

#### Defined in

lib/utils/screenshot/Screenshot.ts:114

---

### getScreenShotUrl

▸ **getScreenShotUrl**(`callback?`): `Promise`\<`string`\>

获取选中地图视图截图的 URL。

#### Parameters

| Name        | Type  | Description                        |
| :---------- | :---- | :--------------------------------- |
| `callback?` | `any` | 可选的回调函数，用于传递数据 URL。 |

#### Returns

`Promise`\<`string`\>

-   返回一个解析为数据 URL 的 Promise。

#### Defined in

lib/utils/screenshot/Screenshot.ts:134

---

### screenShot

▸ **screenShot**(`params`, `mapCanvas`): `string`

生成指定区域 canvas 的截图。

#### Parameters

| Name            | Type                | Description              |
| :-------------- | :------------------ | :----------------------- |
| `params`        | `Object`            | 用于指定截图区域的参数。 |
| `params.height` | `any`               | -                        |
| `params.sx`     | `any`               | -                        |
| `params.sy`     | `any`               | -                        |
| `params.width`  | `any`               | -                        |
| `mapCanvas`     | `HTMLCanvasElement` | 用于截图的画布元素。     |

#### Returns

`string`

如果成功，则返回截图的数据URL，否则返回'截图失败'。

#### Defined in

lib/utils/screenshot/Screenshot.ts:43

---

### shotInstanceInit

▸ **shotInstanceInit**(`instance`): `void`

#### Parameters

| Name       | Type  |
| :--------- | :---- |
| `instance` | `any` |

#### Returns

`void`

#### Defined in

lib/utils/screenshot/Screenshot.ts:30
