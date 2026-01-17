# Yumml Recipe Format Specification

> **Source**: This specification is based on the [Yumml Recipe Format](https://magarcia.io/yumml-recipe-format/) by Martin Garcia.

## Technical Details

- **File extension**: `.yumml` (files MUST be valid YAML)
- **MIME type**: `application/x-yumml+yaml`
- **Encoding**: UTF-8

## Basic Example

```yaml
name: Mrs Fields Choc-Chip Cookies
date: 2011-09-21
prepTime: 15 minutes
cookTime: 10 minutes
ingredients:
  - quantity: 2.5
    unit: cups
    item: plain flour

  - quantity: 0.5
    unit: tsp
    item: bicarbonate of soda

instructions:
  - step: Mix flour, bicarbonate of soda, and salt in a large bowl
  - step: Blend sugars with electric mixer, add margarine to form a grainy paste
```

## Spec

There are three main sections that every recipe MUST include: the header, the ingredients list, and the instructions.

## Header

The header is an implicit section where all the attributes are placed at the root level of the file. All the attributes SHOULD be placed at the top of the file, before ingredients and instructions.

| Attribute     | Type         | Status   | Description                                             |
| ------------- | ------------ | -------- | ------------------------------------------------------- |
| `name`        | string       | REQUIRED | Name of the recipe                                      |
| `date`        | string       | OPTIONAL | Publication date (RFC 3339 format, e.g., `2017-07-21`)  |
| `author`      | string       | OPTIONAL | Author of the recipe                                    |
| `description` | string       | OPTIONAL | Brief description of the recipe                         |
| `prepTime`    | duration     | OPTIONAL | Preparation time (e.g., `15 minutes`)                   |
| `cookTime`    | duration     | OPTIONAL | Cooking/baking time (e.g., `10 minutes`)                |
| `totalTime`   | duration     | OPTIONAL | Total time (MAY be derived from prepTime + cookTime)    |
| `servings`    | integer      | OPTIONAL | Number of portions the recipe serves                    |
| `yield`       | string       | OPTIONAL | What the recipe produces (e.g., `24 cookies`, `1 loaf`) |
| `rating`      | number (1-5) | OPTIONAL | Recipe rating                                           |
| `tags`        | string[]     | OPTIONAL | Categorization tags                                     |

**Duration format**: Human-readable strings. For maximum compatibility, use integers followed by `minutes`, `hours`, or `seconds` (e.g., `15 minutes`, `1 hour 30 minutes`). Parsers SHOULD also accept common abbreviations (`15 min`, `1 hr`) and natural variations (`1.5 hours`).

### Example

```yaml
name: Mrs Fields Choc-Chip Cookies
date: 2011-09-21
author: Paul Jenkins
description: Classic chocolate chip cookies, crispy outside and chewy inside.
prepTime: 15 minutes
cookTime: 10 minutes
servings: 4
yield: 24 cookies
tags:
  - cookies
  - chocolate
ingredients:
  - quantity: 2.5
    unit: cups
    item: plain flour

  - quantity: 0.5
    unit: tsp
    item: bicarbonate of soda

instructions:
  - step: Mix flour, bicarbonate of soda, and salt in a large bowl
  - step: Blend sugars with electric mixer, add margarine to form a grainy paste
```

## Ingredients

The ingredients section is a REQUIRED list of all ingredients needed for the recipe.

| Attribute  | Type             | Status   | Description                                                             |
| ---------- | ---------------- | -------- | ----------------------------------------------------------------------- |
| `quantity` | number \| string | OPTIONAL | Amount (number, fraction like `"1/2"`, or descriptor like `"to taste"`) |
| `unit`     | string           | OPTIONAL | Unit of measurement (see canonical units below)                         |
| `item`     | string           | REQUIRED | Name of the ingredient                                                  |
| `notes`    | string           | OPTIONAL | Additional notes (e.g., `room temperature`, `finely chopped`)           |
| `optional` | boolean          | OPTIONAL | Whether the ingredient is optional (default: `false`)                   |

### Canonical Units

To support conversion between metric and imperial systems, implementations SHOULD recognize these canonical unit abbreviations:

| Category | Units                                     |
| -------- | ----------------------------------------- |
| Volume   | `tsp`, `tbsp`, `cup`, `ml`, `l`, `fl-oz`  |
| Weight   | `g`, `kg`, `oz`, `lb`                     |
| Count    | (omit unit for countable items like eggs) |

### Example

```yaml
ingredients:
  # Numeric quantities
  - quantity: 2.5
    unit: cups
    item: plain flour

  - quantity: 200
    unit: g
    item: chocolate chips
    notes: semi-sweet

  # Fraction string (more readable than 0.5)
  - quantity: "1/2"
    unit: cup
    item: walnuts
    notes: chopped
    optional: true

  # Countable items (no unit needed)
  - quantity: 2
    item: eggs
    notes: room temperature

  # Descriptor string for fuzzy amounts
  - quantity: "to taste"
    item: salt

  # No quantity (implied "some")
  - item: cooking spray
    notes: for greasing
```

## Instructions

The instructions section is a REQUIRED list of steps to prepare the recipe. Instructions support two formats: a simple flat list or grouped sections for complex recipes.

### Simple Format

| Attribute     | Type     | Status   | Description                                |
| ------------- | -------- | -------- | ------------------------------------------ |
| `step`        | string   | REQUIRED | The instruction text                       |
| `duration`    | duration | OPTIONAL | Time for this step                         |
| `temperature` | string   | OPTIONAL | Temperature setting (e.g., `180C`, `350F`) |

```yaml
instructions:
  - step: Preheat oven
    temperature: 180C
  - step: Mix dry ingredients in a large bowl
  - step: Bake until golden brown
    duration: 10 minutes
```

### Grouped Format

For complex recipes with multiple stages, instructions MAY be organized into sections:

> **Implementation note**: Parsers MUST handle both formats. Check for the presence of `section` to determine the format: if any item has a `section` field, treat as grouped; otherwise, treat as simple.

```yaml
instructions:
  - section: For the dough
    steps:
      - step: Mix flour and salt
      - step: Add water gradually

  - section: For the filling
    steps:
      - step: Sauté onions until translucent
        duration: 5 minutes
      - step: Add remaining filling ingredients
```
