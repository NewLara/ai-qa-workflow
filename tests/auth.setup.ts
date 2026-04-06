import { test as setup } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  await page.goto(process.env.BASE_URL!);
  await page.fill('[name="username"]', process.env.TEST_USERNAME!);
  await page.fill('[name="password"]', process.env.TEST_PASSWORD!);
  await page.click('[type="submit"]');
  
  await page.waitForURL('**/dashboard/**');
  
  await page.context().storageState({ path: authFile });
});
