[@jmrepo/gismap](../README.md) / [Exports](../modules.md) / LayersOperations

# Class: LayersOperations\<M, T\>

## Type parameters

| Name | Type                                                                                                      |
| :--- | :-------------------------------------------------------------------------------------------------------- |
| `M`  | `unknown`                                                                                                 |
| `T`  | extends [`LayerOptions`](../interfaces/LayerOptions.md) = [`LayerOptions`](../interfaces/LayerOptions.md) |

## Table of contents

### Constructors

-   [constructor](LayersOperations.md#constructor)

### Properties

-   [groupId](LayersOperations.md#groupid)
-   [id](LayersOperations.md#id)
-   [mapInstance](LayersOperations.md#mapinstance)
-   [options](LayersOperations.md#options)
-   [removeMonitor](LayersOperations.md#removemonitor)
-   [removed](LayersOperations.md#removed)

### Accessors

-   [isRemoved](LayersOperations.md#isremoved)

### Methods

-   [addTo](LayersOperations.md#addto)
-   [beforeRemove](LayersOperations.md#beforeremove)
-   [create](LayersOperations.md#create)
-   [destroy](LayersOperations.md#destroy)
-   [getOriginalLayer](LayersOperations.md#getoriginallayer)
-   [hide](LayersOperations.md#hide)
-   [remove](LayersOperations.md#remove)
-   [show](LayersOperations.md#show)

## Constructors

### constructor

• **new LayersOperations**\<`M`, `T`\>(`mapInstance`, `options`): [`LayersOperations`](LayersOperations.md)\<`M`, `T`\>

#### Type parameters

| Name | Type                                                                                                      |
| :--- | :-------------------------------------------------------------------------------------------------------- |
| `M`  | `unknown`                                                                                                 |
| `T`  | extends [`LayerOptions`](../interfaces/LayerOptions.md) = [`LayerOptions`](../interfaces/LayerOptions.md) |

#### Parameters

| Name          | Type |
| :------------ | :--- |
| `mapInstance` | `M`  |
| `options`     | `T`  |

#### Returns

[`LayersOperations`](LayersOperations.md)\<`M`, `T`\>

#### Defined in

lib/controllers/layer-controller/layers-operations.ts:53

## Properties

### groupId

• `Optional` **groupId**: `string`

#### Defined in

lib/controllers/layer-controller/layers-operations.ts:39

---

### id

• **id**: `string`

#### Defined in

lib/controllers/layer-controller/layers-operations.ts:37

---

### mapInstance

• `Protected` **mapInstance**: `M`

#### Defined in

lib/controllers/layer-controller/layers-operations.ts:54

---

### options

• `Protected` **options**: `T`

#### Defined in

lib/controllers/layer-controller/layers-operations.ts:55

---

### removeMonitor

• `Protected` **removeMonitor**: () => `void`[] = `[]`

#### Defined in

lib/controllers/layer-controller/layers-operations.ts:51

---

### removed

• **removed**: `boolean` = `false`

#### Defined in

lib/controllers/layer-controller/layers-operations.ts:41

## Accessors

### isRemoved

• `get` **isRemoved**(): `boolean`

此图层是否被移除

#### Returns

`boolean`

#### Defined in

lib/controllers/layer-controller/layers-operations.ts:46

## Methods

### addTo

▸ **addTo**(): [`LayersOperations`](LayersOperations.md)\<`M`, `T`\>

内部函数，将图层添加到地图

#### Returns

[`LayersOperations`](LayersOperations.md)\<`M`, `T`\>

#### Defined in

lib/controllers/layer-controller/layers-operations.ts:86

---

### beforeRemove

▸ **beforeRemove**(`fn`): `void`

被移除之前的回调通知

#### Parameters

| Name | Type         |
| :--- | :----------- |
| `fn` | () => `void` |

#### Returns

`void`

#### Defined in

lib/controllers/layer-controller/layers-operations.ts:65

---

### create

▸ **create**(): [`LayersOperations`](LayersOperations.md)\<`M`, `T`\>

内部函数，用于创建图层，此函数将由控制器调用

#### Returns

[`LayersOperations`](LayersOperations.md)\<`M`, `T`\>

#### Defined in

lib/controllers/layer-controller/layers-operations.ts:80

---

### destroy

▸ **destroy**(): `void`

#### Returns

`void`

#### Defined in

lib/controllers/layer-controller/layers-operations.ts:70

---

### getOriginalLayer

▸ **getOriginalLayer**(): `unknown`

获取原始图层，供库内部开发使用，业务层中慎用

#### Returns

`unknown`

The original layer.

#### Defined in

lib/controllers/layer-controller/layers-operations.ts:108

---

### hide

▸ **hide**(): `void`

隐藏此图层

#### Returns

`void`

#### Defined in

lib/controllers/layer-controller/layers-operations.ts:96

---

### remove

▸ **remove**(): `void`

移除此图层，移除后将销毁

#### Returns

`void`

#### Defined in

lib/controllers/layer-controller/layers-operations.ts:101

---

### show

▸ **show**(): `void`

显示此图层

#### Returns

`void`

#### Defined in

lib/controllers/layer-controller/layers-operations.ts:91
