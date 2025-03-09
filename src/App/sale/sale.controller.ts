import { Controller, Get } from '@nestjs/common';
import Together from 'together-ai';

@Controller('sale')
export class SaleController {
  @Get()
  async findAll(): Promise<string> {
    const together = new Together({
      apiKey:
        '0ffbf7d0ce0321a4039604935958aff53497dba4e570355d864c8188585e1158',
    });

    const response = await together.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: 'What are some fun things to do in New York?',
        },
      ],
      model: 'deepseek-ai/DeepSeek-R1-Distill-Qwen-1.5B',
    });

    console.log(response?.choices?.[0]?.message?.content);

    return response?.choices?.[0]?.message?.content || 'No response';
  }
}
